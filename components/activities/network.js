const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get('/', async (req, res) => {
    try {
        const responseController = await controller.getAll();
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if(!id) throw "Id Invalido";
        const responseController = await controller.get(id);
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

router.post('/', async (req, res) => {
    const { user, description } = req.body;
    try {
        if(!user || !description) throw "Datos Invalidos!!";
        const responseController = await controller.add({ user, description });
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

module.exports = router;