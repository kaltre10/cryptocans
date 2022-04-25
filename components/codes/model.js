const mongoose = require('mongoose');
const { Schema } = mongoose;

const Codes = new Schema({
    a: {
        type: String,
    },
    b: {
        type: String,
    },
    c: {
        type: String,
    },
    d: {
        type: String,
    },
    aa: {
        type: Number,
    },
    bb: {
        type: Number,
    },
    cc: {
        type: Number,
    },
    dd: {
        type: Number,
    },

});

module.exports = mongoose.model('codes', Codes);