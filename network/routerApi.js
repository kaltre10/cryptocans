const express = require('express');
const router = express.Router();
const login = require('../components/login/network');
const cans = require('../components/cans/network');
const race = require('../components/race/network');
const market = require('../components/marketplace/network');
const activities = require('../components/activities/network');
const canodrome = require('../components/canodrome/network');
const claim = require('../components/claim/network');
const reset = require('../components/reset/network');
const oraculo = require('../components/oraculo/network');
const codes = require('../components/codes/network');
const ticket = require('../components/ticket/network');
const pass = require('../components/pass/network');
const securex = require('../services/securex');

const cors = require('cors');

const routerApi = app => {

    app.use(cors(), router);
    app.use('/api/v1', router);

        router.use('/login', login);
        router.use('/cans', securex('validate'), cans);
        router.use('/race', race);
        router.use('/marketplace', market);
        router.use('/activities', activities);
        router.use('/canodrome', securex('logged'), canodrome);
        router.use('/claim', claim);
        router.use('/reset', reset);
        router.use('/oraculo', oraculo);
        router.use('/codes', codes);
        router.use('/ticket', ticket);
        router.use('/pass', pass);
}

module.exports = routerApi;