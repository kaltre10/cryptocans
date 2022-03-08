const express = require('express');
const router = express.Router();
const login = require('../components/login/network');

const routerApi = app => {
    app.use('api/v1', router);
    app.use('/', login);
}

module.exports = routerApi;