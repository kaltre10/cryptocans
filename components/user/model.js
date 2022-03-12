const mongoose = require('mongoose');

const { Schema } = mongoose;

const Users = new Schema({
    wallet: {
        type: String,
        required: true
    },
    date: { 
        type: Date,
         default: Date.now 
    }
});

module.exports = mongoose.model('Users', Users);