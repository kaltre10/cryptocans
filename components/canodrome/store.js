const Model = require('./model');

const getAll = wallet => Model.find({ wallet }).populate('userId').exec();
const getCanodrome = id => Model.findOne({ id }).populate('userId').exec();
const addCanodrome = data => Model(data).save();
const updateCanodrome = (id, can) => Model.findByIdAndUpdate({ id }, can);

module.exports = {
    getAll: getAll,
    get: getCanodrome,
    add: addCanodrome,
    update: updateCanodrome
}