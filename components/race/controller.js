const storeCans = require('../cans/store');
const storeLogin = require('../login/store');
const { random } = require('../../services/nftGenerate');

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

    const numRandom = () => random(1, 7);

    const cansResult = [];
    for (let i = 0; i < 6; i++) {
        let random = numRandom();
        (!cansResult.includes(random)) ? cansResult[i] = random : i--
    }
    return cansResult;
}

module.exports = {
    clickPlay
}