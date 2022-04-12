const Model = require('./model');

const addCareer = (career) => Model(career).save();

const getCareer = wallet => Model.find({ wallet }).sort({ date: '-1' }).limit('100');

module.exports = {
    add: addCareer,
    get: getCareer
}