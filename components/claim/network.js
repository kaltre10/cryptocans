const express = require('express');
const router = express.Router()
const controller = require('./controller');
const response = require('../../network/response');

router.patch('/', async (req, res) => {
    const { amount, wallet } = req.body;
    try {   
        if(!amount || !wallet) throw 'Datos Invalidos';
        const responseController = await controller.claim(amount, wallet);
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

module.exports = router;