const Model = require('./model');

const getUser = async wallet => await Model.findOne({ wallet }).exec();
const addUser = async wallet => await Model.create({wallet});
const updateUser = ({ wallet, balanceAfter}) => Model.findOneAndUpdate({ wallet }, { balance: balanceAfter}, { new: true})

module.exports = {
    get: getUser,
    add: addUser,
    update: updateUser
}