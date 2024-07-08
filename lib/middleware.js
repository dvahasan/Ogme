/** User Or Admin Login */
module.exports.userAuth = async (req, res, next) => {
    //console.log(req.sessionID);
    const User = require('../models/user');
    const Cart = require('../models/cart');
    const {_all} = require('../lib/functions');
    try {
        if (req.isAuthenticated()) {
            const findCart = await _all(Cart, {user: req.user._id, publish: true, deleted_at: null});
            req.cart = findCart;
            return next();
        } /*else if (req.signedCookies.user && req.session.passport) {

            console.log('Saved Cookie: ',req.signedCookies.user)

           /!* if(req.signedCookies.user)
                console.log('Cookie Login!');

            if(req.session.passport)
                console.log('Session Login!');*!/

            const id = req.session.passport.user._id;
            const findUser = await _all(User, {_id: id , publish: true, deleted_at: null});
            //console.log(findUser);
            if (findUser.response.count) {
                const findCart = await _all(Cart, {user: id, publish: true, deleted_at: null});
                if (findCart) {
                    req.user = findUser.response.data;
                    req.cart = findCart.response.data;
                    return next();
                } else {
                    throw new DOMException("Unauthorized, You must sign in first!");
                }
            } else {
                throw new DOMException("Unauthorized, You must sign in first!");
            }
        }*/
        //console.log(req.sessionID);
        //console.log('Not Signed In!');
        if (req.signedCookies.cart)
            res.clearCookie("cart");
        return res.send({
            status: 401,
            message: 'Unauthorized, You must sign in first.',
        });
    } catch (e) {
        res.clearCookie("cart");
        return res.send({
            status: 401,
            message: e.message,
        });
    }
};
/** ./User Or Admin Login */


/** Axios Base URL */
module.exports.axiosURL = (protocol, host) =>{
    if(process.env.NODE_ENV !== "production"){
        const port = process.env.PORT || 3000;
        return `${protocol}://${host}:${port}/`;     // Return the complete BaseURL in Development Environment.
    }
    else {
        return `${protocol}://${host}/`;            // Return the complete BaseURL in Production Environment.
    }
}
/** ./Axios Base URL */