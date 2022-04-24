const Model = require('./model');

const get = () => Model.find({});

module.exports = {
    get
};