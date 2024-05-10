/** Required Libraries */

const express = require('express');
const router = express.Router();

/** Required Libraries */

/** Required Controller */
const order = require('../controllers/orderController');
/** ./Required Controller */

/** Required Middleware */
const {userAuth} = require('../lib/middleware');
/** ./Required Middleware */

router.route("/")
    .get(userAuth, order.all)  // View all Products
    .post(userAuth, order.add); // Add new Product

router.route("/:id")
    .get(userAuth, order.state)
    .post(userAuth, order.update)
    .put(userAuth, order.publish)
    .patch(userAuth, order.trash)
    .delete(userAuth, order.delete);

module.exports = router;