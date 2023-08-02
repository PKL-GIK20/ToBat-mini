const Stock = require('../models/stock');

// Menampilkan stok untuk suatu produk berdasarkan ID produk
const getProductStock = async (req, res) => {
  const productId = req.params.productId;
  try {
    const productStock = await Stock.find({ product: productId });
    res.json(productStock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Menambahkan stok baru untuk suatu produk
const addProductStock = async (req, res) => {
  const { product, price, tax, discount, expired_at } = req.body;
  try {
    const newStock = await Stock.create({ product, price, tax, discount, expired_at });
    res.status(201).json(newStock);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller lainnya sesuai kebutuhan, seperti mengubah data stok, atau menghapus stok.
const stockController = {
    getProductStock,
    addProductStock,
  };
  
  module.exports = stockController;