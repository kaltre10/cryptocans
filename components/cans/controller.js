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

const addCan = async (can) => await store.add(can);

const mintCan = ({id, wallet}) => {
    return new Promise( async (resolve, reject) => {
        try {

            if(!id || !wallet) throw 'Datos Invalidos'; 
            const can = mint(id, wallet); //minteamos el can
            const newCan = await addCan(can); //agregamos el nuevo can
            resolve(newCan);

        } catch (error) {
            reject(error);
        }        
    })
}

module.exports = {
    getCan,
    mintCan
}