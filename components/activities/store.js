const Model = require('./model');

const getAll = () => Model.find({}).populate('user').exec();
const getActivities = id => Model.find({ user: id });
const addActivities = data => Model(data).save();

module.exports = {
    getAll: getAll,
    get: getActivities,
    add: addActivities
}