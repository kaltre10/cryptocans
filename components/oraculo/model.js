const mongoose = require('mongoose');
const { Schema } = mongoose;

const Oraculo = new Schema({
    value: {
        type: Number,
        require: true
    },
    id: {
        type: Number,
    },
    min: {
        type: Number,
    },
});

module.exports = mongoose.model('Oraculo', Oraculo);