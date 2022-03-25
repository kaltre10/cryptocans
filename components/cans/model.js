const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const Cans = new Schema({
    id: {
        type: Number,
        required: true
    },
    wallet: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rarity: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    aerodinamica: {
        type: Number,
        required: true
    },
    aceleracion: {
        type: Number,
        required: true
    },
    resistencia: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 1,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    packageId: {
        type: Number,
        required: true
    },
    hash: {
        type: String,
        default: ""
    },
    onSale:{
        type: Object,
        default: {
            sale: false,
            price: 0
        }
    },
    energy:{
        type: Number,
        default: 2
    }
});

Cans.plugin(mongoosePaginate);
module.exports = mongoose.model('Cans', Cans);