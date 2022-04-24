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

module.exports = route;