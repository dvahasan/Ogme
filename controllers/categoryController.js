/** Required Libraries */

//const express = require('express');
//const app = express();
const axios = require('axios');
//const flash = require('connect-flash');
/** ./Required Libraries */

/** Required Functions */
const {_all, _add} = require('../lib/functions');
/** ./Required Functions */

/** Required Models */
const Category = require('../models/category');
/** ./Required Models */


/** Data APIs With Axios And End-Points */
/** View All Categories */
module.exports.all = async (req, res) => {
    const filter = req.query;
    const isFilter = filter._f;
    delete filter._f;

    const response = isFilter ?
        await _all(Category, filter):
        await _all(Category);
    return res.send(response);
}
/** ./View All Categories */

/** Add new Category */
module.exports.add = async (req, res) => {
    const {title} = req.body;
    const response = await _add(Category, {title})
    return res.send(response);
}
/** ./Add new Category */
/** ./Data APIs With Axios And End-Points */