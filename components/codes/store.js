const Model = require('./model');

const get = () => Model.find({});

const decrement = async (data) => {

    let index = Object.keys(data)[0];
    let decre = Object.values(data)[0];

    if(data.index == 'aa'){
        return Model.findOneAndUpdate({ _id: "6266de52ee60d05335efe963" }, { aa: data.amount } , { new: true })
    } 
    if(data.index == 'bb'){
        return Model.findOneAndUpdate({ _id: "6266de52ee60d05335efe963" }, { bb: data.amount } , { new: true })
    } 
    if(data.index == 'cc'){
        return Model.findOneAndUpdate({ _id: "6266de52ee60d05335efe963" }, { cc: data.amount } , { new: true })
    } 
    if(data.index == 'dd'){
        return Model.findOneAndUpdate({ _id: "6266de52ee60d05335efe963" }, { dd: data.amount } , { new: true })
    }   

};

module.exports = {
    get,
    decrement
};