/** Required Libraries */

const express = require('express');
const router = express.Router();

/** Required Libraries */

/** Required Controller */
const cart = require('../controllers/cartControlerr');
/** ./Required Controller */

/** Required Middleware */
const {userAuth} = require('../lib/middleware');
/** ./Required Middleware */

router.route("/")
    .get(userAuth, cart.all)  // View all Products
    .post(userAuth, cart.add); // Add new Product

router.route("/:id")
    .get()
    .post(userAuth, cart.update)
    .put(userAuth, cart.publish)
    .patch(userAuth, cart.trash)
    .delete(userAuth, cart.delete);

module.exports = router;