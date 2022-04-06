const mongoose = require('mongoose');
const { Schema } = mongoose;

const Claim = new Schema({
    wallet: {
        type: String,
        require: true
    },
    porcent: {
        type: Number,
        default: 75,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Claim', Claim);