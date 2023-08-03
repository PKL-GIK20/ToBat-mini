const express = require('express');
const router = express.Router();
const stockProdController = require('../controllers/stockProduct');

router.get('/', stockProdController.getAllStockProds);
router.post('/', stockProdController.addStockProduct);

module.exports = router;
