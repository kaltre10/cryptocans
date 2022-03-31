const Model = require('../user/model');
const ModelCanodrome = require('../canodrome/model');

const login = wallet => {
    return new Promise( async (resolve, reject) => {
        try {

            if(!wallet) throw 'Wallet no valida';  
            const getWallet = await Model.findOne(wallet);
           
            if(!getWallet){
                const newUser = await Model(wallet).save();
                //add canodrome default
                const data = {
                    wallet: newUser.wallet,
                    userId: newUser._id
                }
                await ModelCanodrome(data).save();
                resolve({ message: "Agregado Correctamente!!", newUser });
                return;
            };

            resolve(getWallet); 
           
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