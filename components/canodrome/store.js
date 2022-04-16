const Model = require('./model');

const getCanodromeInMarket = async () => await Model.find({ "onSale.sale": true, status: 1 }).sort({ "onSale.price": 1 });
const getAll = wallet => Model.find({ wallet }).populate('userId').exec();
const getCanodrome = _id => Model.findOne({ _id }).populate('userId').exec();
const addCanodrome = data => Model(data).save();
const updateCanodrome = ( _id, can) => Model.findOneAndUpdate({ _id }, { $push: { cans: can } });
const deleteCan = ( _id, cans ) => Model.findOneAndUpdate({ _id }, { cans },
    { new: true });
const energyCanodrome = ( _id, energy) => Model.findOneAndUpdate({ _id }, energy );

const setSellCanodrome = (canodromeId, canodrome) =>  Model.findOneAndUpdate({ _id: canodromeId }, canodrome, { new: true } );

const setRemoveCanodrome = (canodromeId) =>  Model.findOneAndUpdate({ _id: canodromeId }, { "onSale.sale": false, "onSale.price": 0 }, { new: true } );

const setStatus = (canodromeId, status) =>  Model.findOneAndUpdate({ _id: canodromeId }, { status }, { new: true } );

module.exports = {
    getAll: getAll,
    get: getCanodrome,
    add: addCanodrome,
    update: updateCanodrome,
    updateEnergy: energyCanodrome,
    delete: deleteCan,
    setSellCanodrome,
    getCanodromeInMarket,
    setRemoveCanodrome,
    setStatus
}