const store = require('./store');
const canStore = require('../cans/store');
const socket = require('../../socket').socket;

const getAll = async () => {
    return new Promise( async (resolve, reject) => {
        try {
            const cansAll = await canStore.getAllCans();
            
            //websocket
            socket.io.emit('data', cansAll);  

            resolve(cansAll);
        } catch (error) {
            reject(error);
        }
    })
}

const updateCans = async (canId, data) => {
    return new Promise( async (resolve, reject) => {
        try {
            const canUpdate = await store.update(canId, data);

            //envio por websocket
            await getAll();

            resolve(canUpdate);
        } catch (error) {
            reject(error);
        }
    })
}

const buyMarket = (canId, walletBuyer, hash) => {
    return new Promise( async (resolve, reject) => {
        try {

            //get can
            const can = await canStore.get(canId);
        
            //add market transaction
            const data = {
                seller: can.wallet,
                buyer: walletBuyer,
                canId: can.id,
                price: can.onSale.price,
                fee: (can.onSale.price * 0.01), //1%
                hash: hash
            }
            const market = await store.add(data);

            //update can
            const canUpdate = await updateCans(can.id, { 
                status: 1, 
                onSale: { 
                    sale: false, 
                    price: 0 
                },
                wallet: walletBuyer
            });

            //envio por websocket
            await getAll();

            resolve({ canUpdate, market });
            
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    updateCans,
    buyMarket,
    getAll
}