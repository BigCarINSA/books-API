const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema(
    {
        name: { type: String, maxlength: 255, required: true },
        author: { type: String, maxlength: 255, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('book', BookSchema);
