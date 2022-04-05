const Model = require('./model');

const getClaim = wallet => Model.findOne({ wallet });
const addClaim = wallet => Model({ wallet }).save();
const setClaim = ( wallet, claim ) => Model.findOneAndUpdate({ wallet }, claim, { new: true });

module.exports = {
    add: addClaim,
    get: getClaim,
    update: setClaim
}