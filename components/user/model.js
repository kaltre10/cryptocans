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
    },
    reset: { 
        type: Date,
         default: Date.now 
    },
    ticket: { 
        type: Number,
        default: 0
    },
    pass: { 
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Users', Users);