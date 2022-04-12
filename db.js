require('dotenv').config({ path: '.env' });
const mongoose = require("mongoose");

const { CONNECT_PRODUCTION, CONNECT_DEVELOPMENT, NODE_ENV } = process.env;

const connectString = NODE_ENV === 'development' ? CONNECT_DEVELOPMENT : CONNECT_PRODUCTION;

const connect = async () => {
    try {
        await mongoose.connect(connectString);
        console.log('conectado mongoDB');
    } catch (error) {
        console.log(error);
        process.exit(1) //detiene la app
    }
}

module.exports = connect;