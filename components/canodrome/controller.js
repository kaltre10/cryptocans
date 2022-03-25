const store = require('./store');
const storeCan = require('../user/store');
const { exists } = require('./model');

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

//tipos de canodromos 
const typeCanodrome = {
    1: 3, //tipo 1 (common) cans max 3
    2: 6, //tipo 2 (rares) cans max 6
    3: 9, //tipo 3 (epic) cans max 9
    4: 12 //tipo 4 (legendary) cans max 9
}

const checkAddCan = async (id) => {
    const canodrome = await get(id);
    if(canodrome.cans.length > typeCanodrome[canodrome.type] -1) return false;
    
    return true;
}

//UPDATE CANODROME
const update = (id, can) => {
    return new Promise( async (resolve, reject) => {
        try {
            const checkLength = await checkAddCan(id);
           
            if(!checkLength) throw 'Este canodromo no tiene suficiente energia';

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