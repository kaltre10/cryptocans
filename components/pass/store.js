const Model = require('./model');

const getAll = () => Model.find({});
const getOne = (passId) => Model.findOne({ _id: passId}).exec();
const sell = (wallet, amount, price) => Model({wallet, amount, price}).save();
const remove = (passId) => Model.deleteOne({ _id: passId})
module.exports = {
    getAll,
    getOne,
    sell,
    remove
};