const { add } = require('./store');
const store = require('./store');

const login = wallet => {
    return new Promise( async (resolve, reject) => {
        try {
            if(!wallet) throw 'Wallet no valida';  
            let getWallet = await store.get(wallet);
            if(!getWallet){
                getWallet = await addWallet(wallet);
                resolve({ message: "Agregado Correctamente!!", getWallet });
            }
            resolve(getWallet);    
        } catch (error) {
            reject(error);
        }        
    })
};

const addWallet = async (wallet) => await store.add(wallet);

module.exports = {
    login
}