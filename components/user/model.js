const mongoose = require('mongoose');

const { Schema } = mongoose;

const Users = new Schema({
    wallet: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        default: 0
    },
    date: { 
        type: Date,
         default: Date.now 
    }
});

module.exports = mongoose.model('Users', Users);