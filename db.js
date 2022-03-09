require('dotenv').config({ path: '.env' });
const mongoose = require("mongoose");

const connect = async () => {
    try {
        await mongoose.connect(process.env.CONNECT);
        console.log('conectado mongoDB');
    } catch (error) {
        console.log(error);
        process.exit(1) //detiene la app
    }
}

module.exports = connect;