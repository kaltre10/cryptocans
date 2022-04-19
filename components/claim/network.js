const express = require('express');
const router = express.Router()
const controller = require('./controller');
const response = require('../../network/response');

router.get('/:wallet', async (req, res) => {
    const { wallet } = req.params;
    try {
        if(!wallet) throw 'Datos Invalidos';
        const responseController = await controller.getClaim(wallet.toLocaleLowerCase());
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
})

router.post('/:wallet', async (req, res) => {
    const { wallet } = req.params;
    try {
        if(!wallet) throw 'Datos Invalidos';
        const responseController = await controller.calClaim(wallet.toLocaleLowerCase());
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
})

router.patch('/', async (req, res) => {
    const { amount, wallet } = req.body;
    try {   
        if(!amount || !wallet) throw 'Datos Invalidos';
        const responseController = await controller.claim(amount, wallet.toLocaleLowerCase());
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

module.exports = router;