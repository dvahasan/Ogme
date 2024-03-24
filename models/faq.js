/** Model Naming
 *      - Model names are written in CamelCase with first letter UPPERCASE {EX: AdminSchema}.
 *      - An Object with underscore ( _ ) {EX: _folder} at the beginning of it's name means that it contains other Objects inside.
 *      - Object name which consists of two words {EX: created_at} is split with underscore ( _ ).
 * */

const mongoose = require('mongoose');
const {Schema} = mongoose;

const FAQSchema = new Schema ({
    question:{ // FAQ Question
        type: String,
        required: true,
    },
    answer:{ // FAQ Answer
        type: String,
        required: true,
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

module.exports = mongoose.model("FAQ", FAQSchema);