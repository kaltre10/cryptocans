const storeCans = require('../cans/store');

const getAll = async () => {
    return new Promise( async (resolve, reject) => {
        try {
            const cansAll = await storeCans.getAll();
            resolve(cansAll);
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getAll
}