const express = require('express');
const connect = require('./db');
const path = require('path');

const app = express();
app.use(express.json());

const routerApi = require('./network/routerApi');

app.use(express.static(__dirname + '/'));

connect();

routerApi(app);

    app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
    
    app.get('/dapp', (req, res) => res.sendFile(path.join(__dirname, './dapp/index.html')));
    app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, './dapp/index.html')));
    app.get('/market', (req, res) => res.sendFile(path.join(__dirname, './dapp/index.html')));
    app.get('/shop', (req, res) => res.sendFile(path.join(__dirname, './dapp/index.html')));
    app.get('/race', (req, res) => res.sendFile(path.join(__dirname, './dapp/index.html')));

    app.get('*/', (req, res) => res.status(404).send('Error 404'));

const port = process.env.PORT || 3000;

app.listen( port, () => {
    console.log(`server activo en el puerto ${port}`);
});