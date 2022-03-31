const store = require('../user/store');
const storeCanodrome = require('../canodrome/store');

const login = wallet => {
    return new Promise( async (resolve, reject) => {
        try {

            if(!wallet) throw 'Wallet no valida';  
            const getWallet = await store.get(wallet)
           
            if(!getWallet){
                const newUser = await addWallet(wallet)
                //add canodrome default
                const data = {
                    wallet: newUser.wallet,
                    userId: newUser._id
                }
                await storeCanodrome.add(data);
                resolve({ message: "Agregado Correctamente!!", newUser })   
            };

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