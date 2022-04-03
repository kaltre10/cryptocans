const Model = require('./model');

const getUser = async wallet => Model.findOne({ wallet }).exec();
const addUser = async wallet => Model.create({wallet}).exec();
const updateUser = ({ wallet, balanceAfter}) => Model.findOneAndUpdate({ wallet }, { balance: balanceAfter}, { new: true})

module.exports = {
    get: getUser,
    add: addUser,
    update: updateUser
}