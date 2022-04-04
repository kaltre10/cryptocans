const express = require('express');
const router = express.Router()
const controller = require('./controller');
const response = require('../../network/response');

router.get('/:wallet', async (req, res) => {
    const { wallet } = req.params;
    try {
        let walletUser = wallet.toLowerCase();      
        if(!walletUser) throw 'Datos Invalidos';
        const responseController = await controller.resetEnergy(walletUser);
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

router.post('/', async (req, res) => {
    const { wallet, canId, canodromeId } = req.body;
    try {
        let walletUser = wallet.toLowerCase();      
        if(!walletUser || !canId || !canodromeId) throw 'Datos Invalidos';
        const responseController = await controller.clickPlay(walletUser, canId, canodromeId);
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

module.exports = router;