const store = require('./store');

const getAll = async () => {
    return new Promise( async (resolve, reject) => {
        try {
            const activities = await store.getAll();
            resolve(activities);
        } catch (error) {
            reject(error);
        }
    });
}

const get = async (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const activities = await store.get(id);
            resolve(activities);
        } catch (error) {
            reject(error);
        }
    });
}

const add = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            const { user, description } = data; 
            const activitie = await store.add(data);

            resolve(activitie);
            
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getAll,
    get,
    add
}