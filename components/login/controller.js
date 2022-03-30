const store = require('../user/store');
const storeCanodrome = require('../canodrome/store');

const login = wallet => {
    return new Promise( async (resolve, reject) => {

        try {
            if(!wallet) throw 'Wallet no valida';  
            store.get(wallet)
            .then(getWallet => {

                if(getWallet == null){
                    addWallet(wallet)
                    .then(() => {
                        //add canodrome default
                        store.get(wallet)
                        .then(user => {
                            const data = {
                                wallet: user.wallet,
                                userId: user._id
                            }
                            storeCanodrome.add(data)
                            .then(() => resolve({ message: "Agregado Correctamente!!", getWallet }))   
                        })
                    })
                }

                resolve(getWallet);    
            })
            
           
        } catch (error) {
            reject(error);
        }        
    })
};

const addWallet = async (wallet) => await store.add(wallet);

module.exports = {
    login
}