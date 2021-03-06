const store = require('./store');
const storeUser = require('../user/store');
const storeCan = require('../cans/store');
const { mint } = require('../../services/nftCanodromes.js');
const socket = require('../../socket').socket;

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

            const user = await storeUser.get(wallet);
            const data = {
                wallet: wallet.toLowerCase(),
                userId: user._id
            }

            //si existe el typo de canodromo
            if(type) data.type = type;
            
            const canodrome = await store.add(data);
            resolve(canodrome);
        } catch (error) {
            console.log(error)
            reject(error);
        }
    });
}

//MINT CANODROME
const mintCanodrome = (wallet, packageId, canodromeId, hash) => {
    return new Promise( async (resolve, reject) => {
        try {

            const user = await storeUser.get(wallet.toLowerCase());

            if(!user) throw 'User does not exist';
            
            const data = {
                wallet: wallet.toLowerCase(),
                userId: user._id,
                packageId
            }
  
            const result = await mint(data);
            
            //add id and hash for blockchain
            result.id = canodromeId;
            result.hash = hash;
            const canodrome = await store.add(result);
            
            resolve(canodrome);
        } catch (error) {
            console.log(error)
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

const checkForSell = async (id) => {
    const canodrome = await get(id);
    return canodrome.onSale.sale;
}

//UPDATE CANODROME
const update = (id, can) => {
    return new Promise( async (resolve, reject) => {
        try {

            //check can existe
            const checkCan = await storeCan.get(can.can.id);
            if(!checkCan) throw 'Disculpe este can no existe';
          
            //check cans
            const checkCanodrome = await get(id);
            if(checkCanodrome.wallet !== checkCan.wallet) throw 'Disculpe este can no le pertenece';

            //all canodromes
            const canodromesAllUser = await store.getAll(checkCan.wallet);
            const canodromesAll = canodromesAllUser.map((canodrome) => canodrome.cans);
            const canodromesAllFlat = canodromesAll.flat();
            const arrayCanInCanodromes = canodromesAllFlat.map(can => can.can.id);

            //check can in canodrome
            if(arrayCanInCanodromes.includes(can.can.id)) throw 'Este can ya se encuentra asignado a un canodromo';
            
            
            // const arrayCans = checkCanodrome.cans.map(can => can.can.id);
      
            // if(arrayCans.includes(can.can.id)) throw 'Este can ya se encuentra en el canodromo';

            const checkLength = await checkAddCan(id);
           
            if(!checkLength) throw 'Este canodromo no tiene suficiente energia';

            const sale = await checkForSell(id);
            if(sale) throw 'No puede usar un Canodromo en Venta';

            const canodrome = await store.update(id, can);
            resolve(canodrome);

        } catch (error) {
            reject(error);
        }
    });
}

const sellCanodrome = (canodromeId, canodrome) => {
    return new Promise( async (resolve, reject) => {
        try {
            
            canodrome.cans = [];
            const newCanodrome = await store.setSellCanodrome(canodromeId, canodrome);
            
            //websocket
            const canodromesMarket = await store.getCanodromeInMarket();
            socket.io.emit('canodromesMarket', canodromesMarket);

            resolve(newCanodrome);

        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
}

const removeCanodrome = canodromeId => {
    return new Promise( async (resolve, reject) => {
        try {

            const newCanodrome = await store.setRemoveCanodrome(canodromeId);

            //websocket
            const canodromesMarket = await store.getCanodromeInMarket();
            socket.io.emit('canodromesMarket', canodromesMarket);

            resolve(newCanodrome);

        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
}

const setStatusCanodrome = (canodromeId, status) => {
    return new Promise( async (resolve, reject) => {
        try {

            const newCanodrome = await store.setStatus(canodromeId, status);

            resolve(newCanodrome);

        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
}

//DELETE CAN
const deleteCan = (canodromeId, canId) => {
    return new Promise( async (resolve, reject) => {
        try {
          
            const canodrome = await get(canodromeId); 
            const arrayCans = canodrome.cans.filter(can => can.can.id != canId)      
            const exe = await store.delete(canodromeId, arrayCans);
            resolve(exe);

        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getAll,
    get,
    add,
    update,
    deleteCan,
    mintCanodrome,
    sellCanodrome,
    removeCanodrome,
    setStatusCanodrome
}