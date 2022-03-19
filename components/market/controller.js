const storeCans = require('../cans/store');

const getAll = async (limit, page) => {
    return new Promise( async (resolve, reject) => {
        try {
            const cansAll = await storeCans.getAll(limit, page);
            const { docs } = cansAll;
            const cans = docs.filter(can => can.onSale.sale == true);

            //paginate data
            const paginate = {
                totalDocs:cansAll.totalDocs,
                limi: cansAll.limi,
                totalPages: cansAll.totalPages,
                page: cansAll.page,
                pagingCounter: cansAll.pagingCounter,
                hasPrevPage: cansAll.hasPrevPage,
                hasNextPage: cansAll.hasNextPage,
                prevPage: cansAll.prevPage,
                nextPage: cansAll.nextPage
            };
           
            resolve({ cans, paginate });
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getAll
}