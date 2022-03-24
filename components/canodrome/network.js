const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

//GET CANODROMES 
router.get('/', async (req, res) => {
    const id = req.query.id;
    const wallet = req.query.wallet;
    let responseController;
    if(wallet){
        responseController = await controller.getAll(wallet);
    }else{
        if(id){
            responseController = await controller.get(id);
        }
    }
    
    try {
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});


//ADD CANODROME
router.post('/', async (req, res) => {
    const { wallet, type } = req.body;
    try {
        if(!wallet) throw "Datos Invalidos!!";
        const responseController = await controller.add(wallet, type);
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});


//UPDATE CANODROME
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const can = req.body;
    try {
        if(!id) throw "Id Invalidos!!";
        const responseController = await controller.update(id, can);
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

module.exports = router;