const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CounterSchema = new Schema(
    {
        reference: { type: String, maxlength: 255, required: true },
        counter: { type: Number, required: true },
        maxValue: { type: Number },
        minValue: { type: Number },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('counter', CounterSchema);
