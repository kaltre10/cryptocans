const mongoose = require('mongoose');

const { Schema } = mongoose;

const Pass = new Schema({
    wallet: {
        type: String,
        required: true,
        unique: false
    },
    amount: {
        type: Number,
        required: true,
    },
    date: { 
        type: Date,
         default: Date.now 
    },
    price: { 
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('Pass', Pass);