const Penerimaan = require('../models/penerimaan');
const mongoose = require('mongoose');


// Controller untuk menambahkan penerimaan produk baru
const addPenerimaan = async (req, res) => {
  const { product, total_price, tax, discount, quantity_macro } = req.body;
  try {
    // Periksa apakah ID produk yang diterima adalah ID yang valid
    const isValidProductId = mongoose.Types.ObjectId.isValid(product);
    if (!isValidProductId) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    // Periksa apakah produk dengan ID yang diberikan ada dalam database
    const existingProduct = await Product.findById(product);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Buat penerimaan baru dengan mengaitkannya dengan produk yang valid
    const newPenerimaan = await Penerimaan.create({
      product,
      total_price,
      tax,
      discount,
      quantity_macro,
    });

    res.status(201).json(newPenerimaan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller untuk mendapatkan semua penerimaan produk
const getAllPenerimaan = async (req, res) => {
  try {
    const penerimaan = await Penerimaan.find().populate('product', 'name');
    res.status(200).json(penerimaan);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  addPenerimaan,
  getAllPenerimaan,
};
