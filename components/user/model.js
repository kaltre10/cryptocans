const mongoose = require('mongoose');

const { Schema } = mongoose;

const Users = new Schema({
    wallet: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Users', Users);