const storeCans = require('../cans/store');
const storeUser = require('../user/store');
const storeCareers = require('../carrers/store');
const storeCanodrome = require('../canodrome/store');
const { random } = require('../../services/nftGenerate');

//* type and gain for career
const type = {
    1: { // common type, token earning per place
        1: 30, //first place
        2: 20, //second place
        3: 10  //trird place
    },
    2: { // rare type, token earning per place (common * 2)
        1: 60, //first place
        2: 40, //second place
        3: 20  //trird place
    },
    3: { // epic type, token earning per place (common * 4)
        1: 120, //first place
        2: 80, //second place
        3: 40  //trird place
    },
    4: { // legendary type, token earning per place (common * 8)
        1: 240, //first place
        2: 160, //second place
        3: 80  //trird place 
    }
}

const clickPlay = async (wallet, canId, canodromeId) => {
    return new Promise( async (resolve, reject) => {
        try {
           
            //check can energies
            const can = await getCan(canId);
            if(can.energy == 0)  throw "disculpe!! este can no dispone de energia";

            //check canodrome energies
            const canodrome = await storeCanodrome.get(canodromeId);
            if(canodrome.energy == 0)  throw "disculpe!! este canodromo no dispone de energia";

            const userWallet = await getUser(wallet);
            if(!can) throw "disculpe!! no existe el can";
            if(!userWallet) throw "disculpe!! no existe esta wallet";

            if(can.wallet !== userWallet.wallet) throw "No tiene permisos para esta acción";

            resolve(playRun(can, userWallet.balance, canodrome))

        } catch (error) {
            reject(error);
        }
    })
}

const getCan = id => storeCans.get(id);
const getUser = wallet => storeUser.get(wallet);

const playRun = async (can, balance, canodrome) => {

    const numRandom = () => random(1, 7);

    const cansResult = []; //career result array
    for (let i = 0; i < 6; i++) {
        let random = numRandom();
        (!cansResult.includes(random)) ? cansResult[i] = random : i--
    }

    let career = await careerSave(cansResult.indexOf(1) + 1, can, balance, canodrome);
    
    return {
        places: cansResult,
        career
    };
}

const careerSave = async (place, can, balance, canodrome) => {

    let gainToken = type[can.rarity][place] || 0;
    let balanceAfter = balance + gainToken || balance ;
    
    const data = {
        wallet: can.wallet,
        place: place,
        balancePrev: balance,
        balanceAfter: balanceAfter,
        gainToken: gainToken,
        canId: can.id
    }
    
    //add career
    const career = await storeCareers.add(data);

    //update user (balance)
    await storeUser.update(career);

    //update can (-1 de energia)
    await storeCans.set(can.id, { energy: can.energy -1 });

    //update canodrome (-1 de energia)
    await storeCanodrome.updateEnergy(canodrome._id, { energy: canodrome.energy -1 });

    return career;
}

const getCareerUser = (wallet) => {
    return new Promise( async (resolve, reject) => {  
        try {
            const career = await storeCareers.get(wallet);
            resolve(career);
        } catch (error) {
            console.log(error)
            reject(error);
        }
    });
}

module.exports = {
    clickPlay,
    getCareerUser
}