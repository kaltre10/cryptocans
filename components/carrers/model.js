const mongoose = require('mongoose');

const { Schema } = mongoose;

const Careers = new Schema({
    wallet: {
        type: String,
        required: true
    },
    place: {
        type: Number,
        required: true
    },
    balancePrev: {
        type: Number,
        required: true
    },
    balanceAfter: {
        type: Number,
        required: true
    },
    gainToken: {
        type: Number,
        required: true
    },
    canId: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Careers', Careers);