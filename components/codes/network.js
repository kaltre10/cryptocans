const express = require('express');
const route = express.Router();
const controller = require('./controller');
const response = require('../../network/response');

route.get('/', async (req, res) => {
    try {
        const responseController = await controller.get();
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

route.post('/', async (req, res) => {
    const { code, wallet } = req.body;
    try {
        if(!code) throw 'Data Invalid';
        const responseController = await controller.validate(code);
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

route.post('/verify', async (req, res) => {
    const { wallet } = req.body;
    try {
        if(!wallet) throw 'Data Invalid';
        const responseController = await controller.verify(wallet);
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

module.exports = route;