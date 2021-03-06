const storeUser = require('../user/store');
const storeCans = require('../cans/store');
const storeCanodromes = require('../canodrome/store');

//tipos de canodromos 
const typeCanodrome = {
    1: 12, //tipo 1 (common) energy max 12
    2: 24, //tipo 2 (rare) energy max 24 
    3: 36, //tipo 3 (epic) energy max 36
    4: 48, //tipo 4 (legendary) energy max 48
}

const resetEnergy = async (wallet) => {
    return new Promise( async (resolve, reject) => {
        try {

            const user = await storeUser.get(wallet);
            if(!user) throw "Error de usuario";

            const date = new Date();
            const reset = new Date(user.reset);

            //date reset for return
            dayReset = `${reset.getDate()}/${reset.getMonth()}/${reset.getFullYear()} | ${reset.getHours()}:${reset.getMinutes()}`;

            //verificamos si ha pasado mas de 2 dias
            const dayDiferencia = date.getDate() - reset.getDate();

            //validamos la fecha del servidor con el reset
            if( dayDiferencia == 0 && 
                date.getMonth() == reset.getMonth() &&
                date.getFullYear() == reset.getFullYear()){
                    resolve(dayReset)
                    return;
                } 

            if(date.getHours() >= reset.getHours() || dayDiferencia < 0 || dayDiferencia >= 2 ){

                const walletUser = user.wallet.toLowerCase();
                const canodromes = await storeCanodromes.getAll(walletUser);

                //update canodromes all
                canodromes.forEach( async canodrome => await storeCanodromes.updateEnergy( canodrome._id, { energy: typeCanodrome[canodrome.type] }));

                //update cans all
                const cans = await storeCans.cansUser(walletUser);
                cans.forEach( async can => await storeCans.set( can.id, { energy: 4 } ));

                //update user date reset
                await storeUser.set(walletUser, { reset: Date() });
                resolve(dayReset);
                return;
            }
           
            resolve(dayReset);
            return;

        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    resetEnergy
}