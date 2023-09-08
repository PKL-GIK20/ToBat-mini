const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');


// Menampilkan semua produk
router.get('/', productController.getAllProducts);

// Menambahkan produk baru
router.post('/add', productController.addProduct);

// Rute untuk mengupdate produk berdasarkan ID
router.put('/:id', productController.updateProductById);

// Rute untuk menghapus produk berdasarkan ID
router.delete('/delete/:id', productController.deleteProductById);

// Controller lainnya sesuai kebutuhan, seperti mengubah data produk, atau menghapus produk.

module.exports = router;
