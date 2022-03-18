const storeCans = require('../cans/store');
const storeUser = require('../user/store');
const storeCareers = require('../carrers/store');
const { random } = require('../../services/nftGenerate');

//* race positions
let places = {
    1: 30, //first place
    2: 20, //second place
    3: 10  //trird place
}

const clickPlay = async (wallet, id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const can = await getCan(id);
            const userWallet = await getUser(wallet);
            if(!can) throw "disculpe!! no existe el can";
            if(!userWallet) throw "disculpe!! no existe esta wallet";

            if(can.wallet !== userWallet.wallet) throw "No tiene permisos para esta acción";

            resolve(playRun(can, userWallet.balance))

        } catch (error) {
            reject(error);
        }
    })
}

const getCan = id => storeCans.get(id);
const getUser = wallet => storeUser.get(wallet);

const playRun = async (can, balance) => {

    const numRandom = () => random(1, 7);

    const cansResult = [];
    for (let i = 0; i < 6; i++) {
        let random = numRandom();
        (!cansResult.includes(random)) ? cansResult[i] = random : i--
    }

    let career = await careerSave(cansResult.indexOf(1) + 1, can.id,  can.wallet, balance);
    
    return {
        places: cansResult,
        career
    };
}

const careerSave = async (place, canId, wallet, balance) => {

    let balanceAfter = balance + places[place] || balance ;
    let gainToken = places[place] || 0;
    const data = {
        wallet: wallet,
        place: place,
        balancePrev: balance,
        balanceAfter: balanceAfter,
        gainToken: gainToken,
        canId: canId
    }
    
    const career = await storeCareers.add(data);
    await storeUser.update(career);
    return career;
}

module.exports = {
    clickPlay
}