const storeUser = require('../user/store');

const claim = async (amount, wallet) => {
    return new Promise( async (resolve, reject) => {
        try {
            //check user balance
            const user = await storeUser.get(wallet);
            if(amount <= 0) throw "La cantidad no puede ser menor o igual a 0";
            
            if(user.balance < amount)  throw "disculpe!! No tiene fondos suficientes";

            //calc new balance
            const balanceAfter = user.balance - amount;

            //update balance
            const updateBalance = await storeUser.update({wallet, balanceAfter});
            
            resolve(updateBalance);
        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
}

module.exports = {
    claim
}