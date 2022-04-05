const storeUser = require('../user/store');
const storeClaim = require('../claim/store');
const approveContract = require('../../services/approveContract');

const getClaim = async (wallet) => {
    return new Promise( async (resolve, reject) => {
        try {
            const claim = await storeClaim.get(wallet);
            resolve(claim);
            return;

        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
}

//dias para comparar
const days = { 0: 75, 1: 70, 2: 65, 3: 60, 4: 55, 5: 50, 6: 45, 7: 40, 8: 35, 9: 30, 10: 25, 11: 20, 12: 15, 13: 10, 14: 5, 15: 0
}

//calcular porcentaje del calim
const calClaim = async (wallet) => {
    return new Promise( async (resolve, reject) => {
        try {
            const user = await storeUser.get(wallet);
            const claim = await storeClaim.get(user.wallet);

            if(claim.status == true){
                resolve(false);
                return;
            } 
            
            //verificamos cuantos dias han pasado
            const date = new Date();
            const dateClaim = new Date(claim.date)
            const day = diferenciaDias(date, dateClaim);
            const porcent = days[day] || 0;
            await storeClaim.update(wallet, { porcent, status: false })
            resolve(true);
            return;

        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
}

const claim = async (amount, wallet) => {
    return new Promise( async (resolve, reject) => {
        try {
            //check user balance
            const user = await storeUser.get(wallet);
            if(amount <= 0) throw "La cantidad no puede ser menor o igual a 0";
            
            if(user.balance < amount)  throw "disculpe!! No tiene fondos suficientes";

            //calc new balance
            const balanceAfter = user.balance - amount;

            await approveContract(amount, wallet);

            //update balance
            const updateBalance = await storeUser.update({wallet, balanceAfter});

            //update reset date claim
            await storeClaim.update(wallet, { porcent: 75, date: Date(), status: false });
            
            resolve(updateBalance);
        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
}

diferenciaDias = function(dateServe, dateClaim){
    let date1 = Date.UTC(dateServe.getFullYear(), dateServe.getMonth(), dateServe.getDate());
    let date2 = Date.UTC(dateClaim.getFullYear(), dateClaim.getMonth(), dateClaim.getDate());
    let dif = date1 - date2;
    return Math.floor(dif / (1000 * 60 * 60 * 24));
}

module.exports = {
    getClaim,
    claim,
    calClaim
}