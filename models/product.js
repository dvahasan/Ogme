/** Model Naming
 *      - Model names are written in CamelCase with first letter UPPERCASE {EX: AdminSchema}.
 *      - An Object with underscore ( _ ) {EX: _folder} at the beginning of it's name means that it contains other Objects inside.
 *      - Object name which consists of two words {EX: created_at} is split with underscore ( _ ).
 * */

const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductSchema = new Schema({
    name: { // Product name
        type: String,
        required: true,
        trim: true,
    },
    category: { // Product Category such as ['Ogme Drive', 'Ogme Bottles', 'Oqme Glassware', 'Ogme Sun Catcher', etc...]
        type: String,
        required: true,
    },
    price: { // Product price
        type: Number,
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
    brief: { // A short about the product story, to fill in product cards
        type: String,
        trim: true,
    },
    story: { // Full product story
        type: String,
        trim: true,
    },
    featureImage: { // Link for Feature Image
        type: String,
    },
/*    reviews: {
        type: Array,
    },*/
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

module.exports = mongoose.model('Product', ProductSchema);