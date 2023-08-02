const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stock');

// Menampilkan stok untuk suatu produk berdasarkan ID produk
router.get('/products/:productId/stock', stockController.getProductStock);

// Menambahkan stok baru untuk suatu produk
router.post('/products/:productId/stock', stockController.addProductStock);

// Controller lainnya sesuai kebutuhan, seperti mengubah data stok, atau menghapus stok.

module.exports = router;
