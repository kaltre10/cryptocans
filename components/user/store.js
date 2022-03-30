const Model = require('./model');

const getUser = async wallet => await Model.findOne({ wallet });
const addUser = async wallet => await Model({wallet}).save();
const updateUser = ({ wallet, balanceAfter}) => Model.findOneAndUpdate({ wallet }, { balance: balanceAfter}, { new: true})

module.exports = {
    get: getUser,
    add: addUser,
    update: updateUser
}