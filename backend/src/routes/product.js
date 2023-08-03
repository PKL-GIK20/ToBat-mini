const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');


// Menampilkan semua produk
router.get('/', productController.getAllProducts);

// Menambahkan produk baru
router.post('/add', productController.addProduct);

// Controller lainnya sesuai kebutuhan, seperti mengubah data produk, atau menghapus produk.

module.exports = router;
