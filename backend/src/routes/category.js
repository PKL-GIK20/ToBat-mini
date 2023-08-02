const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

// Route untuk menampilkan semua kategori produk
router.get('/', categoryController.getAllCategories);

// Route untuk menambahkan kategori produk baru
router.post('/', categoryController.addCategory);

// Route untuk mengupdate kategori produk berdasarkan ID
router.put('/:id', categoryController.updateCategoryById);

// Route untuk menghapus kategori produk berdasarkan ID
router.delete('/:id', categoryController.deleteCategoryById);

module.exports = router;
