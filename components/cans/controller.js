const store = require('./store');
const mint = require('../../services/nftGenerate');

const getCan = (id) => {
    return new Promise( async (resolve, reject) => {
        try {

            if(!id) throw 'Id no valido';  
            let can = await store.get(id);
            if(!can) resolve({ message: "Este Id no existe", can })
            resolve(can);  

        } catch (error) {
            reject(error);
        }        
    });
};

const mintCan = ({id, wallet}) => {
    return new Promise( async (resolve, reject) => {
        try {

            if(!id || !wallet) throw 'Datos Invalidos'; 
            const can = mint(id, wallet); //minteamos el can
            const newCan = await store.add(can); //agregamos el nuevo can
            resolve(newCan);

        } catch (error) {
            reject(error);
        }        
    })
}

const setStatusCan = id => {
    return new Promise( async (resolve, reject) => {
        try {
            if(!id) throw "Datos Invalidos";
            const newCan = await store.set(id, { status: 1});
            resolve(newCan);
        } catch (error) {
            reject(error);
        }
    });
    
};
 
module.exports = {
    getCan,
    mintCan,
    setStatusCan
}