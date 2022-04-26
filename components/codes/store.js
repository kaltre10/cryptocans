const Model = require('./model');
const ModelUser = require('../user/model');

const get = () => Model.find({});

const decrement = async (data) => {

    let index = Object.keys(data)[0];
    let decre = Object.values(data)[0];

    if(data.index == 'aa'){
        return Model.findOneAndUpdate({}, { aa: data.amount } , { new: true })
    } 
    if(data.index == 'bb'){
        return Model.findOneAndUpdate({}, { bb: data.amount } , { new: true })
    } 
    if(data.index == 'cc'){
        return Model.findOneAndUpdate({}, { cc: data.amount } , { new: true })
    } 
    if(data.index == 'dd'){
        return Model.findOneAndUpdate({}, { dd: data.amount } , { new: true })
    }   

};

const verify = async (wallet) => {

    const user = await ModelUser.findOne({ wallet});
    const incrementPass =  user.pass + 1;
    const decrementTicket =  user.ticket - 1;
    const data = { pass: incrementPass, ticket: decrementTicket }

    await ModelUser.findOneAndUpdate({ wallet }, data, { new: true })
}

const updateRandom = (randomData, code) => {

    if(code == 'a'){
        return Model.findOneAndUpdate({}, { a: randomData, aa: 1000 } , { new: true })
    } 
    if(code == 'b'){
        return Model.findOneAndUpdate({}, { b: randomData, bb: 1000 } , { new: true })
    } 
    if(code == 'c'){
        return Model.findOneAndUpdate({}, { c: randomData, cc: 1000} , { new: true })
    } 
    if(code == 'd'){
        return Model.findOneAndUpdate({}, { d: randomData, dd: 1000 } , { new: true })
    }   

}

module.exports = {
    get,
    decrement,
    verify,
    updateRandom
};