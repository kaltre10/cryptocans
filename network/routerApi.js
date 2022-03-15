const express = require('express');
const router = express.Router();
const login = require('../components/login/network');
const cans = require('../components/cans/network');
const race = require('../components/race/network');
const cors = require('cors');

const routerApi = app => {
    app.use(cors(), router);
    app.use('/api/v1', router);

    router.use('/login', login);
    router.use('/cans', cans);
    router.use('/race', race);
}

module.exports = routerApi;