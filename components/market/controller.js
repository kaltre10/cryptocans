const storeCans = require('../cans/store');

const getAll = async (limit, page) => {
    return new Promise( async (resolve, reject) => {
        try {
            const cansAll = await storeCans.getAll(limit, page);
            const { docs } = cansAll;
            const cans = docs.filter( can => can.onSale.sale == true);
            resolve(cans);
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getAll
}