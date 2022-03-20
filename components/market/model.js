const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const Market = new Schema({
    seller: {
        type: String,
        required: true
    },
    buyer: {
        type: String,
        required: true
    },
    canId: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    fee: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    hash: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('Market', Market);