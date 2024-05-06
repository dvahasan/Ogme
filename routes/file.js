/** Required Libraries */

const express = require('express');
const router = express.Router();

/** Required Libraries */

/** Required Controller */
const file = require('../controllers/fileController');
/** ./Required Controller */

router.route("/")
    .get(file.all)  // View all Products
    .post(file.add); // Add new Product

router.route("/:id")
    .get()
    .post(file.update)
    .put(file.publish)
    .patch(file.trash)
    .delete(file.delete);


module.exports = router;