const express = require('express');
const route = express.Router();
const controller = require('./controller');
const response = require('../../network/response');

route.post('/', async (req, res) => {
    const { amount, wallet } = req.body;
    try {
        if(!amount || !wallet) throw 'Data Invalid';
        const responseController = await controller.add(amount, wallet.toLowerCase());
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

module.exports = route;