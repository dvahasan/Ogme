/** Required Libraries */

const express = require('express');
const router = express.Router();

/** Required Libraries */


/** Required Controller */
const mail = require('../controllers/mailController');
/** ./Required Controller */

router.route("/")
    .get(mail.mailForm)
    .post(mail.askUs);  // View all Products

router.route('/custom')
    .post(mail.sendingEmail)




module.exports = router;