/** Model Naming
 *      - Model names are written in CamelCase with first letter UPPERCASE {EX: UserSchema}.
 *      - An Object with underscore ( _ ) {EX: _folder} at the beginning of it's name means that it contains other Objects inside.
 *      - Object name which consists of two words {EX: created_at} is split with underscore ( _ ).
 * */

const mongoose = require('mongoose');
const {Schema} = mongoose;
const OrderSchema = new Schema({
    user: { // User attached to order
        type: Schema.Types.ObjectId,
        required: true,
    },
    product_name:{
        type: String,
        required: true,
    },
    product_id:{
        type: Schema.Types.ObjectId,
        required: true,
    },
    product_price:{
        type: String,
        required: true,
    },
    _sale: { // _sale object contains { onSale for true or false sale, and price if true onSale }
        onSale: {
            type: Boolean,
            default: false,
        },
        price: {
            type: Number,
            default: 0,
        },
    },
    quantity: {
        type: Number,
    },
    state:{ // Pending, Confirmed, Rejected OR Completed
        type: String,
        default: 'Pending',
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


module.exports = mongoose.model('Order', OrderSchema);