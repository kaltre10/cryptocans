const store = require('./store');

const login = wallet => {
    new Promise( async (resolve, reject) => {
        try {
            if(!wallet) reject('Wallet no valida');  
            const loginSuccess = await store.login(wallet);
            if(!loginSuccess) reject('Problemas al autenticar');
            resolve(loginSuccess);
        } catch (error) {
            reject(error);
        }
        
    })
};

module.exports = {
    login
}