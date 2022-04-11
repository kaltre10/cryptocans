const Model = require('./model');

const getValue = () => Model.findOne({});
const setValue = ({value, min}) => Model.findOneAndUpdate({ _id: "6254729b8178567f7b6cd771" }, { value, min }, { new: true });

module.exports = {
    get: getValue,
    update: setValue,
}