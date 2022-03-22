const mongoose = require('mongoose');

const { Schema } = mongoose;

const Activities = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'Users',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: { 
        type: Date,
         default: Date.now 
    }
});

module.exports = mongoose.model('Activities', Activities);