const store = require('../user/store');
const storeCanodrome = require('../canodrome/store');

const login = wallet => {
    return new Promise( async (resolve, reject) => {
        try {

            if(!wallet) throw 'Wallet no valida';  
            const getWallet = await getUser(wallet);
           
            if(getWallet){
                resolve(getWallet); 
            }
           
            const newUser = await addWallet(wallet)
            //add canodrome default
            const data = {
                wallet: newUser.wallet,
                userId: newUser._id
            }
            await addCanodrome(data);
            resolve({ message: "Agregado Correctamente!!", newUser });

        } catch (error) {
            reject(error);
        }        
    })
};

const addWallet = async (wallet) => await store.add(wallet);
const getUser = async (wallet) => await store.get(wallet);
const addCanodrome = async (data) => await storeCanodrome.add(data);

module.exports = {
    login
}