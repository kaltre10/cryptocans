const mongoose = require("mongoose");

const connect = async (url) => {
    try {
        await mongoose.connect(url)
        console.log('conectado mongoDB');
    } catch (error) {
        console.log(error);
        process.exit(1) //detiene la app
    }
}

module.exports = connect;