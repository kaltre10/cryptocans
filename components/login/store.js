const Model = require('../user/model');

const getWallet = wallet => Model.findOne({ wallet });
const addWallet = wallet => Model({wallet}).save();

module.exports = {
    get: getWallet,
    add: addWallet
}