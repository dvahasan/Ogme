/** Required Libraries */

//const express = require('express');
//const app = express();
const axios = require('axios');
//const flash = require('connect-flash');
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
const Product = require('../models/product');
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
        await _all(Product, filter, {skip, limit}) :
        await _all(Product,null, {skip, limit});
    return res.send(response);
}
/** ./View All Products */

/** Add new Product */
module.exports.add = async (req, res) => {
    //return res.send(req.body);
    const body = req.body;
    const response = await _add(Product, body);
    return res.send(response);
}
/** ./Add new Product */

/** Update Document */
module.exports.update = async (req, res) => {
    //return res.send(req.body);
    const body = req.body, {id} = req.params;
    const response = await _update(Product, id, body);
    return res.send(response);
}
/** ./Update Document */

/** Publish Or Hide Product */
module.exports.publish = async (req, res) => {
    const body = req.body, {id} = req.params;
    const response = await _publish(Product, id, body.publish);
    return res.send(response);
}
/** ./Publish Or Hide Product */

/** Trash A Product */
module.exports.trash = async (req, res) => {
    const {id} = req.params, q = req.query;
    const response = await _trash(Product, id, q);
    return res.send(response);
}
/** ./Trash A Product */

/** Delete A Product */
module.exports.delete = async (req, res) => {
    const {id} = req.params;
    const response = await _delete(Product, id);
    return res.send(response);
}
/** ./Delete A Product */

/** ./Data APIs With Axios And End-Points */