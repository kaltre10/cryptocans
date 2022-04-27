const express = require('express');
const route = express.Router();
const controller = require('./controller');
const response = require('../../network/response');

route.get('/', async (req, res) => {
    try {
        const responseController = await controller.get();
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 500);
    }
});

route.post('/sell', async (req, res) => {
    const { amount, price, wallet } = req.body;
    try {
        if(!amount || !wallet) throw 'Data Invalid';
        const responseController = await controller.sell(parseInt(amount), parseFloat(price), wallet.toLowerCase());
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

route.post('/buy', async (req, res) => {
    const { passId, wallet } = req.body;
    try {
        if(!passId || !wallet) throw 'Data Invalid';
        const responseController = await controller.buy(passId, wallet.toLowerCase());
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

route.delete('/', async (req, res) => {
    const { passId, wallet } = req.body;
    try {
        if(!passId || !wallet) throw 'Data Invalid';
        const responseController = await controller.cancel(passId, wallet.toLowerCase());
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

module.exports = route;