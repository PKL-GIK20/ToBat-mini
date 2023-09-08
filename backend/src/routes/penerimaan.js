const express = require('express');
const router = express.Router();
const penerimaanController = require('../controllers/penerimaan');

// Route untuk menampilkan semua penerimaan produk
router.get('/', penerimaanController.getAllPenerimaan);

// Route untuk menambahkan penerimaan produk baru
router.post('/add', penerimaanController.addPenerimaan);

module.exports = router;
