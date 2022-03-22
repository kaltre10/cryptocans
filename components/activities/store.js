const Model = require('./model');

const getAll = id => Model.find({}).populate('user').exec();
const getActivities = id => Model.find({ id });
const addActivities = data => Model(data).save();

module.exports = {
    getAll: getAll,
    get: getActivities,
    add: addActivities
}