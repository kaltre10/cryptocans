const Model = require('./model');

const getUser = wallet => Model.findOne({ wallet });
const addUser = wallet => Model({wallet}).save();
const updateUser = ({ wallet, balanceAfter}) => Model.findOneAndUpdate({ wallet }, { balance: balanceAfter})


module.exports = {
    get: getUser,
    add: addUser,
    update: updateUser
}