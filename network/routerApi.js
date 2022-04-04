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
const cors = require('cors');

const routerApi = app => {

    app.use(cors(), router);
    app.use('/api/v1', router);

        router.use('/login', login);
        router.use('/cans', cans);
        router.use('/race', race);
        router.use('/marketplace', market);
        router.use('/activities', activities);
        router.use('/canodromes', canodrome);
        router.use('/claim', claim);
        router.use('/reset', reset);
}

module.exports = routerApi;