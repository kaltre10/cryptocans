const store = require('./store');
const storeUser = require('../user/store');
const socket = require('../../socket').socket;

const sell = (amount, price, wallet) => {
    return new Promise( async (resolve, reject) => {
        try {
            const user = await storeUser.get(wallet);
            if(!user) throw 'data invalid';

            if(amount <= 0 || price <= 0) throw 'Data Invalid';
            
            //check pass
            if(user.pass < amount) throw 'You do not have this amount of pass available to sell';

            //decrement pass user
            const decrementPass = user.pass - amount;
            await storeUser.set(wallet, { pass: decrementPass });

            //add pass market
            await store.sell(wallet, amount, price);

            //websocket
            getPass = await store.getAll();
            socket.io.emit('passData', getPass);   
            
            resolve("add");
        } catch (error) {
            console.log(error)
            reject(error)
        }
    });
}

const buy = (passId, wallet) => {
    return new Promise( async (resolve, reject) => {
        try {
            const user = await storeUser.get(wallet);
            if(!user) throw 'Data invalid';

             //get pass market
             const pass = await store.getOne(passId);
             if(!pass) throw 'Data invalid'

            //check balance
            if(user.balance < pass.price) throw "you don't have enough credits";

            //decrement balance and add pass
            const decrementBalance = user.balance - pass.price;
            const passAdd = user.pass + pass.amount;
            await storeUser.set(wallet, { balance: decrementBalance, pass: passAdd });

            //add balance seller
            const seller = await storeUser.get(pass.wallet);
            const balanceSeller = seller.balance + pass.price;
            await storeUser.set(pass.wallet, { balance: balanceSeller });

            //remove pass market
            await store.remove(passId);

            //websocket
            getPass = await store.getAll();
            socket.io.emit('passData', getPass);   
    
            resolve("success");
        } catch (error) {
            console.log(error)
            reject(error)
        }
    });
}

const cancel = (passId, wallet) => {
    return new Promise( async (resolve, reject) => {
        try {
            const user = await storeUser.get(wallet);
            if(!user) throw 'Data invalid';

             //get pass market
            const pass = await store.getOne(passId);
            if(!pass) throw 'Data invalid';

            //check permissions
            if(pass.wallet != wallet)  throw 'Does not have permissions';

            //add pass user
            const amountPass = user.pass + pass.amount;
            await storeUser.set(wallet, { pass: amountPass });

            //remove pass market
            await store.remove(passId);

            //websocket
            getPass = await store.getAll();
            socket.io.emit('passData', getPass);   
    
            resolve("success");
        } catch (error) {
            console.log(error)
            reject(error)
        }
    });
}

module.exports = {
    sell,
    buy,
    cancel
}