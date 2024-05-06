/** Required Libraries */

const express = require('express');
const router = express.Router();

/** Required Libraries */

/** Required Controller */
const user = require('../controllers/userController');
/** ./Required Controller */

router.route("/")
    .get(user.all)  // View all Products
    .post(user.add); // Add new Product

router.get('/new', user.new);
router.get('/login', user.sign);
router.get('/logout', user.logout);
router.post('/login', user.login);
/*router.route("/:id")
    .get()
    .post(user.update)
    .put(user.publish)
    .patch(user.trash)
    .delete(user.delete);*/

module.exports = router;