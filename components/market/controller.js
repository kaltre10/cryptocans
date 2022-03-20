const store = require('./store');
const canStore = require('../cans/store');

const updateCans = async (canId, data) => {
    return new Promise( async (resolve, reject) => {
        try {
            const canUpdate = await store.update(canId, data);
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
                estatus: 1, 
                onSale: { 
                    sale: false, 
                    price: 0 
                },
                wallet: walletBuyer
            })

            resolve({ canUpdate, market });
            
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    updateCans,
    buyMarket
}