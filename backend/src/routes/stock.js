const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stock');

router.get('/', stockController.getAllStocks);

router.post('/', stockController.addStock);


module.exports = router;
