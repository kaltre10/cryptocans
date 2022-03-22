const Model = require('./model');

const addCareer = (career) => Model(career).save();

const getCareer = wallet => Model.find({ wallet })

module.exports = {
    add: addCareer,
    get: getCareer
}