const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if(!id) throw "Id Invalido";
        const responseController = await controller.getCan(id);
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

router.post('/', async (req, res) => {
    const { id, wallet  } = req.body;
    try {
        if(!id || !wallet) throw "Datos Invalidos!!";
        const responseController = await controller.mintCan({ id, wallet });
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { hash } = req.body;
    try {
        if(!id || !hash) throw "Datos Invalidos!!";
        const responseController = await controller.setStatusCan(id, hash);
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

module.exports = router;