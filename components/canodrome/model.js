const mongoose = require('mongoose');
const Cans = require('../cans/model');

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
        type: Array,
        default: []
    },
    url: {
        type: String,
        default: "Name Common Canodrome"
    },
    packageId: { 
        type: Number,
        default: 0
    },
    date: { 
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('Canodrome', Canodrome);