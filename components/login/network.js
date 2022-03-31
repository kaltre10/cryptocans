const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.post('/', async (req, res) => {
    const {wallet} = req.body;
    try {
        if(!wallet) throw "Wallet invalida";
        const responseController = await controller.login(wallet);
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
    // return;
});

module.exports = router;