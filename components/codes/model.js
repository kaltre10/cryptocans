const mongoose = require('mongoose');
const { Schema } = mongoose;

const Codes = new Schema({
    codes: {
        type: Array,
    },
    current: {
        type: Array
    }
});

module.exports = mongoose.model('codes', Codes);