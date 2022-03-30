const store = require('../user/store');
const storeCanodrome = require('../canodrome/store');

const login = wallet => {
    return new Promise( async (resolve, reject) => {
        try {
            if(!wallet) throw 'Wallet no valida';  
            let getWallet = await store.get(wallet);
            if(getWallet === null){
                getWallet = await addWallet(wallet);

                //add canodrome default
                const user = await store.get(wallet);
                const data = {
                    wallet: user.wallet,
                    userId: user._id
                }
                const canodrome = await storeCanodrome.add(data);

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