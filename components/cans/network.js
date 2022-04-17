const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

//validate can in market 
router.get('/validate/:canId', async (req, res) => {
    const { canId } = req.params;
    try {
        if(!canId) throw "Id Invalido";
        const responseController = await controller.validateCan(canId);
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

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

router.get('/user/:wallet', async (req, res) => {
    const { wallet } = req.params;
    try {
        if(!wallet || wallet === '') throw "wallet Invalida";
        let walletUser = wallet.toLowerCase(); 
        const responseController = await controller.getCansUser(walletUser);
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

router.post('/', async (req, res) => {
    const { packageId, wallet, canId } = req.body;
    try {
        if(!packageId || !wallet, !canId, !hash) throw "Datos Invalidos!!";
        let walletUser = wallet.toLowerCase(); 
        const responseController = await controller.mintCan({ packageId, wallet: walletUser,  canId});
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const can = req.body.can; //object data
    try {
        if(!id) throw "Datos Invalidos!!";
        const responseController = await controller.setStatusCan(id, can);
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

router.delete('/:id/:wallet', async (req, res) => {
    
    const { id, wallet } = req.params;
    try {
        if(!id, !wallet) throw "Datos Invalidos!!";
        let walletUser = wallet.toLowerCase(); 
        const responseController = await controller.deleteCans(id, walletUser);
        response.success(req, res, responseController, 200);
    } catch (error) {
        response.error(req, res, error, 401);
    }
});

module.exports = router;