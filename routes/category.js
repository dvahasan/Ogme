/** Required Libraries */

const express = require('express');
const router = express.Router();

/** Required Libraries */

/** Required Controller */
const category = require('../controllers/categoryController');
/** ./Required Controller */


router.route("/")
    .get(category.all)  // View all Categories
    .post(category.add); // Add new Category

router.route("/:id")
    .get()
    .post(category.update)
    .put(category.publish)
    .patch(category.trash)
    .delete(category.delete);

module.exports = router;