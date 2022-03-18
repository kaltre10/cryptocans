const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');
const router = express.Router();

router.get('/', async (req, res) => {
    try {

        const limit = parseInt(req.query.limit, 10) || 20;
        const page = parseInt(req.query.page, 10) || 1; 
        const responseController = await controller.getAll(limit, page);
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 500);
    }
});

module.exports = router;