/** App Main File, Default Settings and Locals
 *      1-  Required Packages.
 *      2-  Environment Variables.
 *      3-  Models.
 *      4-  Mongoose Connection.
 *      5-  Instantiate Express App.
 *      6-  Sessions And Cookies.
 *      7-  Flash for Feedback Messages.
 *      8-  Template Engine.
 *      9-  URL Encoding.
 *      10- Public Assets.
 *      11- Passport JS For Authentication And Authorization.
 *      12- APP GLOBALS.
 *      13- API Routes.
 *      14- APP Port.
 * */


/** 1-  Required Packages
 *      1-  Express JS.
 *      2-  Path.
 *      3-  EJS-MATE.
 *      4-  Mongoose.
 *      5-  Session.
 *      6-  Connect Flash.
 *      7-  Passport JS.
 *      8-  Method Override.
 *      9-  Body Parser.
 *      10- cookieParser.
 *
 * */

/** 1-  Express JS */
const express = require('express');
/** ./Express JS */

/** 2-  Path */
const path = require('path');
/** ./Path */

/** 3-  EJS-MATE */
const ejsMate = require('ejs-mate');
/** ./EJS-MATE */

/** 4-  Mongoose */
const mongoose = require('mongoose');
/** ./Mongoose */

/** 5-  Session */
const session = require('express-session');
/** ./Session */

/** 6-  Connect-Flash For Flashing Messages with Feedback  */
const flash = require('connect-flash');
/** ./Connect-Flash For Flashing Messages with Feedback  */

/** 7-  Passport JS For Authentication And Authorization */
const passport = require('passport');
const LocalStrategy = require('passport-local');
/** ./Passport JS For Authentication And Authorization */

/** 8-  Method Override */
const methodOverride = require('method-override');
/** ./Method Override */

/** 9-  Body Parses */
const bodyParser = require('body-parser');
/** ./Body Parses */

/** 10- Cookie Parser */
const cookieParser = require('cookie-parser')
/** ./Cookie Parser */

/** ./Required Packages */

/** 2-  Environment Variables */
if (process.env.NODE_ENV !== "production")
    require("dotenv").config();
/** ./Environment Variables */


/** 3-  Models
 *      1- User.
 * */
/** 1-  */ const User = require("./models/user");
/** ./Models */


/** 4-  Mongoose Connection */
mongoose.connect(process.env.DB_LINK)
    .then(() => console.log('Database connected!'))
    .catch((error) => console.log(`Connection Error: ${error}`));

/** ./Mongoose Connection */


/** 5-  Instantiate Express App */
const app = express();
/** ./Instantiate Express App */

/** 6-  Sessions And Cookies */
/** Sessions Configuration */
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 600000}
}));
/** ./Sessions Configuration */
/** Cookies Configuration */
app.use(cookieParser("thisIsASecret"))
/** ./Cookies Configuration */
/** ./Sessions And Cookies */

/** 7-  Flash for feedback messages */
app.use(flash());
/** ./Flash for feedback messages */

/** 8-  Template Engine */
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
/** ./Template Engine */

/** 9-  URL Encoding */
app.use(bodyParser.json({type: 'application/*+json'}))
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
/** ./URL Encoding */

/** 10- Public Assets */
app.use('/assets', express.static('public'));
/** ./Public Assets */

/** 11- Passport JS For Authentication And Authorization */
app.use(passport.initialize());
app.use(passport.session());
passport.use('user', new LocalStrategy(User.authenticate()));

passport.serializeUser(function (user, done) {
    return done(null, user);
});

passport.deserializeUser(function (obj, done) {
    return done(null, obj);
});
/** ./Passport JS For Authentication And Authorization */

/** 12- APP GLOBALS */
/** ./APP GLOBALS */

/** 13- API Routes */
const {category, product, file, user, order, cart, mail} = require("./routes/routes");

/** 1-  */ app.use('/category', category);
/** 2-  */ app.use('/product', product);
/** 3-  */ app.use('/file', file);
/** 4-  */ app.use('/user', user);
/** 5-  */ app.use('/order', order);
/** 6-  */ app.use('/cart', cart);
/** 7-  */ app.use('/mail', mail);

/** Main Route and Redirection to Home Route */
app.get('/', (req, res) => {
    res.send("Hello OGME");
});
/** ./Main Route and Redirection to Home Route */
/** ./API Routes */

/** 14- APP Port */
app.listen(process.env.PORT);
/** APP Port */