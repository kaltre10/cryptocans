const Model = require('./model');

const addCareer = async (career) => Model(career).save();

module.exports = {
    add: addCareer,
}