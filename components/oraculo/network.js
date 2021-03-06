const express = require('express');
const router = express.Router()
const controller = require('./controller');
const response = require('../../network/response');

router.get('/', async (req, res) => {
    try {
        const responseController = await controller.get();
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
})

router.patch('/', async (req, res) => {
    const { value, min } = req.body;
    try {   
        if(!value || !min) throw 'Datos Invalidos';
        const responseController = await controller.update(value, min);
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

module.exports = router;