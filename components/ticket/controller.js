const store = require('./store');
const storeUser = require('../user/store');

const add = (amount, wallet) => {
    return new Promise( async (resolve, reject) => {
        try {
            const user = await storeUser.get(wallet);
            if(!user) throw 'data invalid';

            const amountTotal = user.ticket + amount;

            //add ticket
            await store.add(wallet, amountTotal);

            resolve("add");
        } catch (error) {
            console.log(error)
            reject(error)
        }
    });
}

module.exports = {
    add
}