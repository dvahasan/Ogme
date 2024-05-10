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
/** View All Orders */
module.exports.all = async (req, res) => {
    const filter = req.query;
    const isFilter = filter._f, skip = filter._s, limit = filter._l;
    delete filter._f;
    delete filter._s;
    delete filter._l;
    filter['user'] = req.user._id;

    const response = isFilter ?
        await _all(Order, filter, {skip, limit}) :
        await _all(Order,null, {skip, limit});
    return res.send(response);
}
/** ./View All Orders */

/** Add new Order */
module.exports.add = async (req, res) => {
    let r = {};
    try {
        if (req.body.user === req.user._id){
            const body = req.body;
            const data = await _add(Order, body);
            r = {
                status: 200,
                message: "Successfully Added",
                data,
            };
        } else {
            throw new DOMException("Unauthorized, You must sign in first!");
        }
    }catch (e) {
        r = {
            status: 401,
            message: e.message,
        };
    }
    return res.send(r);
}
/** ./Add new Order */

/** Update Document */
module.exports.update = async (req, res) => {
    //return res.send(req.body);
    const body = req.body, {id} = req.params;
    const response = await _update(Order, id, body);
    return res.send(response);
}
/** ./Update Document */

/** Publish Or Hide Order */
module.exports.publish = async (req, res) => {
    const body = req.body, {id} = req.params;
    const response = await _publish(Order, id, body.publish);
    return res.send(response);
}
/** ./Publish Or Hide Order */

/** Trash A Order */
module.exports.trash = async (req, res) => {
    const {id} = req.params, q = req.query;
    const response = await _trash(Order, id, q);
    return res.send(response);
}
/** ./Trash A Order */

/** Delete A Order */
module.exports.delete = async (req, res) => {
    const {id} = req.params;
    const response = await _delete(Order, id);
    return res.send(response);
}
/** ./Delete A Order */

/** Order State */
module.exports.state = async (req, res) => {
    const body = req.query, {id} = req.params;
    const response = await _update(Order, id, body);
    return res.send(response);
}
/** ./Order State */

/** ./Data APIs With Axios And End-Points */