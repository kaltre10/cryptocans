const mongoose = require('mongoose');

const { Schema } = mongoose;

const Canodrome = new Schema({
    wallet: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.ObjectId,
        ref: 'Users',
        required: true
    },
    energy: {
        type: Number,
        default: 6
    },
    type: {
        type: Number,
        default: 1 //common
    },
    cans: {
        type: Object,
    },
    url: {
        type: String,
        default: "Name Common Canodrome"
    },
    date: { 
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('Canodrome', Canodrome);