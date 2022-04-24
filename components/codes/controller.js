const store = require('./store');

const get = () => {
    return new Promise( async (resolve, reject) => {
        try {
            const data = await store.get();
            resolve(data[0].current);
        } catch (error) {
            console.log(error)
            reject(error)
        }
    });
}

const generateRandom = () => {

}

module.exports = {
    get,
}