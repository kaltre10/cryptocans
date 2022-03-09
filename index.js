const express = require('express');
const connect = require('./db');
const path = require('path');
require('dotenv').config();
const routerApi = require('./network/routerApi');
const app = express();
app.use(express.json());

connect('mongodb+srv://kaltre10:Asking03-.1234@cluster0.uwbby.mongodb.net/test');

routerApi(app);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
// app.get('/dapp', (req, res) => res.sendFile(path.join(__dirname, './dapp/index.html')));

app.listen( port, () => {
    console.log(`server activo en el puerto ${port}`);
});