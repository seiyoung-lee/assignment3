var express = require('express');
var router = express.Router();
var InventoryController = require('../controller/InventoryController');


let items = [];


/* GET users listing. */
router.get('/', InventoryController.getData);

router.get('/:itemId', InventoryController.getOneItem);

router.delete('/:itemId', InventoryController.DeleteItem);

router.post('/', InventoryController.addData);

router.patch('/:itemId', InventoryController.editOneItem);

module.exports = router;
