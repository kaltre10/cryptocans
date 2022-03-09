const mongoose = require("mongoose");

const connect = async (url) => {
    try {
        await mongoose.connect(url)
        console.log('conectado mongoDB');
    } catch (error) {
        console.log(error)
    }
        // .then(() => console.log('conectado correctamente mongoDB'))
}

module.exports = connect;