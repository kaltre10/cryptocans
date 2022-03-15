const express = require('express');
const router = express.Router()
const controller = require('./controller');
const response = require('../../network/response');

router.post('/', async (req, res) => {
    const { wallet, id } = req.body;

    try {
        let walletUser = wallet.toLowerCase();      
        if(!walletUser || !id) throw 'Datos Invalidos';
        const responseController = await controller.clickPlay(walletUser, id);
        response.success(req, res, responseController, 401);
    } catch (error) {
        response.error(req, res, error, 401);
    }
    
});

module.exports = router;