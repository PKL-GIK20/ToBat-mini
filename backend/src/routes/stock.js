const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stock');

// Menampilkan stok untuk suatu produk berdasarkan ID produk
router.get('/', stockController.getAllStocks);

// Menambahkan stok baru untuk suatu produk
router.post('/', stockController.addStock);

// Controller lainnya sesuai kebutuhan, seperti mengubah data stok, atau menghapus stok.

module.exports = router;
