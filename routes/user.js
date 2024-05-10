/** Required Libraries */

const express = require('express');
const router = express.Router();

/** Required Libraries */

/** Required Controller */
const user = require('../controllers/userController');
/** ./Required Controller */

/** Required Middleware */
const {userAuth} = require('../lib/middleware');
/** ./Required Middleware */

router.route("/")
    .get(user.all)  // View all Products
    .post(user.add); // Add new Product

router.get('/new', user.new);
router.get('/login', user.sign);
router.post('/login', user.login);
router.get('/logout', user.logout);

router.route('/profile')
    .get(userAuth, user.userProfile);
/*router.route("/:id")
    .get()
    .post(user.update)
    .put(user.publish)
    .patch(user.trash)
    .delete(user.delete);*/

module.exports = router;