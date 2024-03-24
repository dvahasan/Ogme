/** Model Naming
 *      - Model names are written in CamelCase with first letter UPPERCASE {EX: UserSchema}.
 *      - An Object with underscore ( _ ) {EX: _folder} at the beginning of it's name means that it contains other Objects inside.
 *      - Object name which consists of two words {EX: created_at} is split with underscore ( _ ).
 * */

const mongoose = require('mongoose');
const {Schema} = mongoose;

/** Passport Plugin to create User Hashed Password */
const passportLocalMongoose = require('passport-local-mongoose');
/** ./Passport Plugin to create User Hashed Password */

const UserSchema = new Schema({
    fullName: {
        type: String,
        trim: true,
        default: null,
    },
    email: {
        type: String,
        default: null,
        trim: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    order:{
        type: Array,
    },
    created_at: { // Date in which the document is created
        type: Date,
        default: Date.now
    },
    deleted_at: { // Date in which the document is trashed
        type: Date,
        default: null
    },
    publish: { // Publish OR Hide Document
        type: Boolean,
        default: true
    }
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);

