const express = require('express');
const router = express.Router();
const stockProdController = require('../controllers/stockProduct');

// Route untuk menampilkan semua stok produk
router.get('/', stockProdController.getAllStockProds);

// Route untuk menambahkan stok produk baru
router.post('/', stockProdController.addStockProd);

module.exports = router;
