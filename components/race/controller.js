const storeCans = require('../cans/store');
const storeLogin = require('../login/store');

const clickPlay = async (wallet, id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const can = await getCan(id);
            const userWallet = await getUser(wallet);
            if(!can) throw "disculpe!! no existe el can";
            if(!userWallet) throw "disculpe!! no existe esta wallet";

            if(can.wallet !== userWallet.wallet) throw "No tiene permisos para esta acción";

            resolve(playRun(can))

        } catch (error) {
            reject(error);
        }
    })
}

const getCan = id => storeCans.get(id);
const getUser = wallet => storeLogin.get(wallet);

const playRun = can => {
    can;
}

module.exports = {
    clickPlay
}