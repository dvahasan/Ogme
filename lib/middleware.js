/** User Or Admin Login */
module.exports.userAuth = async (req, res, next) => {
    const User = require('../models/user');
    const Cart = require('../models/cart');
    const {_all} = require('../lib/functions');
    try {
        if (req.isAuthenticated()) {
            const findCart = await _all(Cart, {user: req.user._id});
            req.cart = findCart;
            return next();
        } else if (req.signedCookies.user) {
            const findUser = await _all(User, {_id: req.signedCookies.user});
            if (findUser) {
                const findCart = await _all(Cart, {user: req.signedCookies.user});
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
        }
        if (req.signedCookies.user)
            res.clearCookie("user");
        res.clearCookie("cart");
        return res.send({
            status: 401,
            message: 'Unauthorized, You must sign in first.',
        });
    } catch (e) {
        return res.send({
            status: 401,
            message: e.message,
        });
    }
};
/** ./User Or Admin Login */