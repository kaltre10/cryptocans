const store = require('./store');
const storeCan = require('../user/store');

//GET CANODROMES USER
const getAll = async (wallet) => {
    return new Promise( async (resolve, reject) => {
        try {
            const canodromes = await store.getAll(wallet);
            resolve(canodromes);
        } catch (error) {
            reject(error);
        }
    });
}

//GET CANODROME
const get = async (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const canodrome = await store.get(id);
            resolve(canodrome);
        } catch (error) {
            reject(error);
        }
    });
}

//ADD CANODROME
const add = (wallet, type) => {
    return new Promise( async (resolve, reject) => {
        try {
            const user = await storeCan.get(wallet);
            const data = {
                wallet: wallet,
                userId: user._id
            }

            //si existe el typo de canodromo
            if(type) data.type = type;

            const canodrome = await store.add(data);
            resolve(canodrome);
        } catch (error) {
            reject(error);
        }
    });
}

//UPDATE CANODROME
const update = (id, can) => {
    return new Promise( async (resolve, reject) => {
        try {
            const canodrome = await store.update(id, can);
            resolve(canodrome);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getAll,
    get,
    add,
    update
}