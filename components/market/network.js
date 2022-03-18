const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const responseController = await controller.getAll();
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 500);
    }
});

module.exports = router;