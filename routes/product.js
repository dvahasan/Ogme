/** Required Libraries */

const express = require('express');
const router = express.Router();

/** Required Libraries */

/** Required Controller */
const product = require('../controllers/productController');
/** ./Required Controller */

router.route("/")
    .get(product.all)  // View all Products
    .post(product.add); // Add new Product

router.route("/:id")
    .get()
    .post()
    .put(product.publish)
    .patch(product.trash)
    .delete(product.delete);

module.exports = router;