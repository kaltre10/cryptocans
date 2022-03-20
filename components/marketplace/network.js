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

/* await status can buy*/
router.patch('/', async (req, res) => {
    try {
        const { canId } = req.body;
        if(!canId) throw 'Datos Invalidos';
        const responseController = await controller.updateCans(canId, { status: 3 });//status 3 buying in the market
        response.success(req, res, responseController, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 500);
    }
});

/* add market transaction */
router.post('/', async (req, res) => {
    try {
        const { canId, walletBuyer, hash, blockchainStatus } = req.body;

        //check blockchainStatus
        if(blockchainStatus == false){
            //update can
            await controller.updateCans(canId, { status: 1 });
            response.success(req, res, "Compra Cancelada!", 200);
        }

        if(!canId, !walletBuyer, !hash) throw 'Datos Invalidos';
        const responseController = await controller.buyMarket(canId, walletBuyer, hash);
        response.success(req, res, responseController, 200);

    } catch (error) {
        console.log(error)
        response.error(req, res, error, 500);
    }
});

module.exports = router;