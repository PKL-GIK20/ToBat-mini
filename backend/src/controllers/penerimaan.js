const Penerimaan = require('../models/penerimaan');
const mongoose = require('mongoose');
const Stock = require('../models/stock');
const Product = require('../models/product');



// Controller untuk menambahkan penerimaan produk baru
const addPenerimaan = async (req, res) => {
    const { product, stock, total_price, tax, discount, quantity_macro } = req.body;
    try {
      // Periksa apakah ID produk dan ID stok yang diterima adalah ID yang valid
      const isValidProductId = mongoose.Types.ObjectId.isValid(product);
      const isValidStockId = mongoose.Types.ObjectId.isValid(stock);
      if (!isValidProductId || !isValidStockId) {
        return res.status(400).json({ message: 'Invalid product or stock ID' });
      }
  
      // Periksa apakah produk dan stok dengan ID yang diberikan ada dalam database
      const existingProduct = await Product.findById(product);
      const existingStock = await Stock.findById(stock);
      if (!existingProduct || !existingStock) {
        return res.status(404).json({ message: 'Product or stock not found' });
      }
  
      // Periksa apakah ada stok yang tersedia
      if (existingStock.jumlah < quantity_macro) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }
  
      // Hitung total harga setelah dikenakan pajak dan potongan harga
      const totalPrice = total_price + (total_price * tax) / 100 - discount;
  
      // Buat penerimaan baru dengan mengaitkannya dengan produk dan stok yang valid
      const newPenerimaan = await Penerimaan.create({
        product,
        stock,
        total_price: totalPrice,
        tax,
        discount,
        quantity_macro,
      });
  
      // Kurangi jumlah stok dengan quantity_macro dari penerimaan
      existingStock.jumlah -= quantity_macro;
  
      // Simpan perubahan jumlah stok ke dalam database
      await existingStock.save();
  
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
