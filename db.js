const mongoose = require("mongoose");

const connect = (url) => {
    mongoose.connect(url)
        .then(() => console.log('conectado correctamente mongoDB'))
}

module.exports = connect;