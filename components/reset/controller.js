const storeUser = require('../user/store');
const storeCans = require('../cans/store');
const storeCanodromes = require('../canodrome/store');

//tipos de canodromos 
const typeCanodrome = {
    1: 6, //tipo 1 (common) energy max 6
    2: 6, //tipo 2 (rares) energy max 9
    3: 9, //tipo 3 (epic) energy max 12
}

const resetEnergy = async (wallet) => {
    return new Promise( async (resolve, reject) => {
        try {

            const user = await storeUser.get(wallet);
            if(!user) throw "Error de usuario";

            const date = new Date();
            const reset = new Date(user.reset);

            //verificamos si ha pasado mas de 2 dias
            const dayDiferencia = date.getDate() - reset.getDate();

            //validamos la fecha del servidor con el reset
            if( dayDiferencia == 0 && 
                date.getMonth() == reset.getMonth() &&
                date.getFullYear() == reset.getFullYear()){
                    resolve(false)
                    return;
                } 

            if(date.getHours() >= reset.getHours() || dayDiferencia < 0 || dayDiferencia >= 2 ){

                const walletUser = user.wallet.toLowerCase();
                const canodromes = await storeCanodromes.getAll(walletUser);

                //update canodromes all
                canodromes.forEach( async canodrome => await storeCanodromes.updateEnergy( canodrome._id, { energy: typeCanodrome[canodrome.type] }));

                //update cans all
                const cans = await storeCans.cansUser(walletUser);
                cans.forEach( async can => await storeCans.set( can.id, { energy: 2 } ));

                //update user date reset
                await storeUser.set(walletUser, { reset: Date() });
                resolve('Energy Completed');
                return;
            }
           
           
                
            
            
            resolve();
            return;

        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
}

module.exports = {
    resetEnergy
}