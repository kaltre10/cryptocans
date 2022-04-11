const store = require('./store');

const get = async () => {
    return new Promise( async (resolve, reject) => {
        try {
            const value = await store.get();
            resolve(value);
        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
}


const update = async (value, min) => {
    return new Promise( async (resolve, reject) => {
        try {
            const newValue = await store.update({value, min});
            resolve(newValue);
        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
}

module.exports = {
    get,
    update,
}