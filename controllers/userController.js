/** Required Libraries */
const passport = require('passport');
const axios = require('axios');
/** ./Required Libraries */

/** Required Middleware */
const {axiosURL} = require('../lib/middleware');
/** ./Required Middleware */

/** Required Functions */
const {
    _all,
    _add,
    _update,
    _publish,
    _trash,
    _delete,
    _JWTToken,
    _JWTVerify
} = require('../lib/functions');
/** ./Required Functions */

/** Required Models */
const User = require('../models/user');
const Order = require('../models/order');
const Cart = require('../models/cart');
/** ./Required Models */


/** Data APIs With Axios And End-Points */
/** View All Products */
module.exports.all = async (req, res) => {
    const filter = req.query;
    const skip = filter._s, limit = filter._l;
    delete filter._s;
    delete filter._l;

    const response = Object.keys(req.query).length > 0 ?
        await _all(User, filter, {skip, limit}) :
        await _all(User, null, {skip, limit});


    const TokenData = {
        "_id": "665c7cae8efce76173b73d80",
        "fullName": "Test User",
        "email": "test@gmail.com",
        "username": "test@gmail.com",
        "mobile": "01012345678",
        "publish": true,
        "created_at": "2024-06-02T14:07:42.469Z",
        "deleted_at": null
    }

    const token = _JWTToken(TokenData, '15m')


    const TokenVerify = _JWTVerify(token)

    console.log(token)
    console.log(TokenVerify)


    return res.send(response);
}
/** ./View All Products */

/** Add new Product */

module.exports.new = (req, res) => {
    return res.render('login');
}

module.exports.add = async (req, res, next) => {

    let r = {};
    try {
        const data = req.body;
        data.username = data.email;
        const new_user = new User(data);
        if (new_user) {
            const add_user = await User.register(new_user, data.password);
            if (add_user) {
                req.body.username = data.email;
                req.body.password = data.password;
                console.log(add_user)

                const emailVerifyToken = _JWTToken({email: add_user.email, id: add_user._id,}, '10 years');

                axios.defaults.baseURL = axiosURL(req.protocol, req.hostname);
                const emailVerifyURL = `mail/custom`;

                /** Sending Verification Email */
                await axios.post(emailVerifyURL, {
                    sender: 'OGME Store',
                    senderEmail: process.env.MAILEMAIL,
                    receiver: add_user.fullName,
                    receiverEmail: add_user.email,
                    subject: `Welcome ${add_user.fullName}`,
                    message: '',
                    url: `${process.env.URL}user/verify/${add_user._id}/${emailVerifyToken}`,
                    template: './views/newUserEmail.ejs',
                },{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                    .then((response) => {
                        console.log('Email Sent From New User')

                    })
                    .catch((err) => {
                        return err.message
                    })
                /** ./Sending Verification Email */

                passport.authenticate('user',
                    function (err, user, info) {
                        req.logIn(user, function (err) {
                            if (err) {
                                r = {
                                    status: 500,
                                    message: 'User not found.',
                                };
                                return res.send(r);
                            }

                            r = {
                                status: 200,
                                message: 'Welcome ' + req.user.fullName.toUpperCase(),
                                user,
                            };

                            /*console.log('User: ', req.user)*/
                            let expireDate = new Date();
                            expireDate.setDate(expireDate.getDate() + parseInt(process.env.DAYS_FOR_COOKIE_TO_EXPIRE));
                            /*res.cookie("user", req.sessionID, {
                                secure: true,
                                httpOnly: true,
                                signed: true,
                                expires: expireDate,
                                priority: 'High'
                            });*/
                            return res.send(r);
                        });
                    })(req, res, next);
            } else {
                throw new DOMException("Not able to save!");
            }
        } else {
            throw new DOMException("Something went wrong! Please try again.");
        }
    } catch (e) {
        r = {
            status: 500,
            message: e.message,
        };
    }



}
/** ./Add new Product */

/** Login */
module.exports.sign = (req, res) => {
    return res.render('signIn');
};
module.exports.login = (req, res, next) => {
    //console.log(req.body)
    let r = {};
    passport.authenticate('user',
        {failureFlash: 'Invalid username or password.'},
        async function (err, user, info) {

            /*      console.log(user)
                  console.log(err)
                  console.log(info)*/
            const findUser = await _all(User, {_id: user._id, publish: true, deleted_at: null});
            if (err) {
                return next(err);
            }
            if (!user) {
                r = {
                    status: 500,
                    message: 'Invalid username or password.',
                };
                return res.send(r);
            }
            if (findUser.response.count === 0) {
                res.clearCookie("user");
                res.clearCookie("cart");
                r = {
                    status: 500,
                    message: 'User not found.',
                };
                return res.send(r);
            }
            req.logIn(user, async function (err) {
                if (err) {
                    return next(err);
                }

                const cart = await _all(User, {user: req.user._id, publish: true, deleted_at: null});

                let expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + parseInt(process.env.DAYS_FOR_COOKIE_TO_EXPIRE));
/*                res.cookie("user", req.user._id, {
                    secure: true,
                    httpOnly: true,
                    signed: true,
                    expires: expireDate,
                    priority: 'High'
                });*/

/*                res.cookie("user", req.sessionID, {
                    secure: true,
                    httpOnly: true,
                    signed: true,
                    expires: expireDate,
                    priority: 'High'
                });*/

                res.cookie("cart", cart, {
                    secure: true,
                    httpOnly: true,
                    signed: true,
                    expires: expireDate,
                    priority: 'High'
                });
                //res.cookie("user", req.user);

                r = {
                    status: 200,
                    message: 'Welcome Back ' + req.user.fullName.toUpperCase(),
                    user,
                };
                return res.send(r);
                /* return next();*/
            });
        })(req, res, next);
};
/** ./Login */

/** Logout User */
module.exports.logout = (req, res) => {
    res.clearCookie("cart");
    delete req.cart;
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        let r = {
            status: 200,
            message: "Good Bye!",
        };
        return res.send(r);
    });

    //res.redirect("/home");
}
/** ./Logout User */

/** Profile */
module.exports.userProfile = async (req, res) => {

    try {
        //console.log(req.session)
        if (req.session.passport.user) {
            const userId = req.session.passport.user._id;
            //const userId = req.signedCookies.user;
            //console.log(`User: ${userId}`)
            //console.log(req.session.passport.user)
            // Fetch the user data from the database
            const user = await User.findById(userId);
            //console.log(`User: ${user}`)

            if (!user) {
                return res.status(404).send({
                    status: 404,
                    message: "User not found",
                });
            }
            const data = {
                _id: userId,
                fullName: req.user.fullName,
                email: req.user.email,
                username: req.user.username,
                mobile: req.user.mobile,
                publish: req.user.publish,
                created_at: req.user.created_at,
                deleted_at: req.user.deleted_at,
            };
            //console.log(data);
            const order = await _all(Order, {user: data._id});
            const cart = await _all(Cart, {user: data._id});


            return res.send({
                status: 200,
                message: "you are signed In.",
                data,
                order,
                cart,
            });
        } else {
            throw new DOMException("User not found!");
        }
    } catch (error) {
        console.error("Error in userProfile:", error.message);
        return res.status(500).send({
            status: 500,
            message: "Internal server error",
        });
    }
}
/** ./Profile */

/** Update Document */
module.exports.update = async (req, res) => {
    const body = req.body, {id} = req.params;
    const response = await _update(User, id, body);
    return res.send(response);
}
/** ./Update Document */

/** Email Verification */
module.exports.verify = async (req, res) => {
    let r = {};
    try {
        const verifyToken = _JWTVerify(req.params.token)

        if (verifyToken){
            const user = await _update(User, req.params.id, {verified: true})
            if (user){
                r = {
                    status: 200,
                    message: 'User Verified Successfully!',
                }
            }else{
                throw new DOMException("Can not update user Please try again later!");
            }
        }else{
            throw new DOMException("Invalid Token Or URL!");
        }

    }catch (e) {
        r = {
            status: 500,
            message: e.message,
        }
    }
    return res.send(r)
}
/** ./Email Verification */

/** ./Data APIs With Axios And End-Points */