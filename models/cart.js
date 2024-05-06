/** Model Naming
 *      - Model names are written in CamelCase with first letter UPPERCASE {EX: UserSchema}.
 *      - An Object with underscore ( _ ) {EX: _folder} at the beginning of it's name means that it contains other Objects inside.
 *      - Object name which consists of two words {EX: created_at} is split with underscore ( _ ).
 * */

const mongoose = require('mongoose');
const {Schema} = mongoose;
const CartSchema = new Schema({
    user: { // User attached to cart
        type: Schema.Types.ObjectId,
        required: true,
    },
    product: { // Product attached to cart
        type: Schema.Types.ObjectId,
        required: true,
    },
    quantity: {
        type: Number,
    },
    price:{
        type: String,
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


module.exports = mongoose.model('Cart', CartSchema);