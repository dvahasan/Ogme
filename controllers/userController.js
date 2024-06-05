/** Required Libraries */
const passport = require('passport');
/** ./Required Libraries */

/** Required Functions */
const {_all,
    _add,
    _update,
    _publish,
    _trash,
    _delete} = require('../lib/functions');
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
    const isFilter = filter._f, skip = filter._s, limit = filter._l;
    delete filter._f;
    delete filter._s;
    delete filter._l;

    const response = isFilter ?
        await _all(User, filter, {skip, limit}) :
        await _all(User,null, {skip, limit});
    return res.send(response);
}
/** ./View All Products */

/** Add new Product */

module.exports.new = (req, res) => {
    return res.render('login');
}

module.exports.add = async (req, res) => {
    let r = {};
    try {
        const data = req.body;
        //const response = await _add(User, body);
        //return res.send(response);
        data.username = data.email;
        const new_user = new User(data);
        if(new_user){
            const add_user = await User.register(new_user, data.password);
            if (add_user){
                r = {
                    status: 200,
                    message: "Successfully Added",
                    data,
                };
            }else{
                throw new DOMException("Not able to save document!");
            }
        }else{
            throw new DOMException("Something went wrong! Please try again.");
        }
    }catch (e) {
        r = {
            status: 500,
            message: e.message,
        };
    }
    return res.send(r);

}
/** ./Add new Product */

/** Login */
module.exports.sign = (req, res) => {
    return res.render('signIn');
};
module.exports.login =  (req, res, next) => {
    let r = {};
    passport.authenticate('user',
        {failureFlash: 'Invalid username or password.'},
         function (err, user, info) {
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
            req.logIn(user, async function (err) {
                if (err) {
                    return next(err);
                }

                const cart = await _all(User, {user: req.user._id});

                let expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + parseInt(process.env.DAYS_FOR_COOKIE_TO_EXPIRE));

                res.cookie("user", req.user._id, {
                    secure: true,
                    httpOnly: true,
                    signed: true,
                    expires: expireDate,
                    priority: 'High'
                });

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
                };
                return res.send(r);
                /* return next();*/
            });
        })(req, res, next);
};
/** ./Login */

/** Logout User */
module.exports.logout = (req, res) => {
    res.clearCookie("user");
    res.clearCookie("cart");
    delete req.cart;
    req.logout(function (err) {
        if (err) { return next(err);}
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
module.exports.userProfile = async(req, res) =>{

    const data = {
        _id: req.signedCookies.user,
        fullName: req.user.fullName,
        email: req.user.email,
        username: req.user.username,
        mobile : req.user.mobile,
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
}
/** ./Profile */

/** Update Document */
module.exports.update = async (req, res) => {
    const body = req.body, {id} = req.params;
    const response = await _update(User, id, body);
    return res.send(response);
}
/** ./Update Document */

/** ./Data APIs With Axios And End-Points */