const storeCans = require('../cans/store');

const getAll = async () => {
    return new Promise( async (resolve, reject) => {
        try {
            const cansAll = await storeCans.getAll();
            const cans = cansAll.filter( can => can.onSale.sale == true);
            resolve(cans);
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getAll
}