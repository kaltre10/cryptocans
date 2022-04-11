const store = require('../user/store');
const storeCans = require('../cans/store');
const storeCanodrome = require('../canodrome/store');
const storeClaim = require('../claim/store');
const storageOraculo = require('../oraculo/store');
const controllerReset = require('../reset/controller');

const login = wallet => {
    return new Promise( async (resolve, reject) => {
        try {
          
            if(!wallet) throw 'Wallet no valida';  
            
            const getWallet = await getUser(wallet);
            
            if(getWallet){

                //si existe el usuario

                //get cans
                const cansUser = await storeCans.cansUser(getWallet.wallet);
                //get canodromes
                const canodromes = await storeCanodrome.getAll(getWallet.wallet);
                //get claim
                const claim = await storeClaim.get(getWallet.wallet);

                //verify reset energy
                controllerReset.resetEnergy(getWallet.wallet);

                //get oracule
                const oracule = await storageOraculo.get();

                resolve({
                    getWallet,
                    cansUser,
                    canodromes,
                    claim,
                    oracule: oracule.value
                }); 
                return;
            }
           
            const newUser = await addWallet(wallet)
            //add canodrome default
            const data = {
                wallet: newUser.wallet,
                userId: newUser._id
            }
            await addCanodrome(data);
            await addClaim(wallet);

            //get cans
            const cansUser = await storeCans.cansUser(newUser.wallet);
            //get canodromes
            const canodromes = await storeCanodrome.getAll(newUser.wallet);
            //get claim
            const claim = await storeClaim.get(newUser.wallet);

            //get oracule
            const oracule = await storageOraculo.get();
            
            resolve({ 
                message: "Agregado Correctamente!!", 
                newUser,
                cansUser,
                canodromes,
                claim,
                oracule: oracule.value
            });

        } catch (error) {
            reject(error);
        }        
    })
};

const addWallet = async (wallet) => await store.add(wallet);
const getUser = async (wallet) => await store.get(wallet);
const addCanodrome = async (data) => await storeCanodrome.add(data);
const addClaim = async (wallet) => await storeClaim.add(wallet);

module.exports = {
    login
}