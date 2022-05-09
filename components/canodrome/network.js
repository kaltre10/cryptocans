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
        console.log(error)
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

//MINT CANODROME
router.post('/mint', async (req, res) => {
    const { wallet, packageId, canodromeId, hash } = req.body;
    try {
        if(!wallet || !packageId) throw "Datos Invalidos!!";
        const responseController = await controller.mintCanodrome(wallet, packageId, canodromeId, hash);
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

//SELL CANODROME
router.patch('/sell/:canodromeId', async (req, res) => {
    const { canodromeId } = req.params;
    const  {canodrome} = req.body;
    try {
        if(!canodromeId || !canodrome) throw "Data Invalid!!";
        const responseController = await controller.sellCanodrome(canodromeId, canodrome);
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});

//REMOVE CANODROME
router.patch('/remove/:canodromeId', async (req, res) => {
    const { canodromeId } = req.params;
    try {
        if(!canodromeId) throw "Data Invalid!!";
        const responseController = await controller.removeCanodrome(canodromeId);
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 401);
    }
});


//UPDATE STATUS CANODROME
router.post('/status/:canodromeId/:status', async (req, res) => {
    const { canodromeId, status } = req.params;
    try {
        if(!canodromeId || !status) throw "Datos Invalidos!!";
        const responseController = await controller.setStatusCanodrome(canodromeId, status);
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

//DELETE CAN
router.delete('/:canodromeId/:canId', async (req, res) => {
    const { canodromeId, canId } = req.params;
    try {
        if(!canodromeId || !canId) throw "Id Invalidos!!";
        const responseController = await controller.deleteCan(canodromeId, canId);
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

module.exports = router;