const Model = require('./model');

const getValue = () => Model.findOne({});
const setValue = ({value, min}) => Model.findOneAndUpdate({}, { value, min }, { new: true });

module.exports = {
    get: getValue,
    update: setValue,
}