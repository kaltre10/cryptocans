const Model = require('./model');
const canModel = require('../cans/model');

const addMarket = async (data) => Model(data).save();

const updateCanMarket = async (canId, data) => canModel.findOneAndUpdate({ canId }, data, { new: true });

// const updateCanBuy = async (can) => canModel.findOneAndUpdate({ id: can.canId }, can);

module.exports = {
    add: addMarket,
    update: updateCanMarket
}