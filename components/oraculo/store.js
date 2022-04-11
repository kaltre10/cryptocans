const Model = require('./model');

const getValue = () => Model.findOne({});
const setValue = (value) => Model.findOneAndUpdate({ _id: "6254729b8178567f7b6cd771" }, {value}, { new: true });

module.exports = {
    get: getValue,
    update: setValue,
}