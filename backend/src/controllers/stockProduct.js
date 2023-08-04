const StockProd = require('../models/stockProduct');
const mongoose = require('mongoose');
const Penerimaan = require('../models/penerimaan');
const Product = require('../models/product');



// Controller untuk menambahkan stok produk baru
const addStockProduct = async (req, res) => {
    const { penerimaan, product, expired_at, quantity_micro } = req.body;
    try {
      // Periksa apakah ID penerimaan yang diterima adalah ID yang valid
      const isValidPenerimaanId = mongoose.Types.ObjectId.isValid(penerimaan);
      const isValidProductId = mongoose.Types.ObjectId.isValid(product);
      if (!isValidPenerimaanId || !isValidProductId) {
        return res.status(400).json({ message: 'Invalid penerimaan ID' });
      }
  
      // Periksa apakah penerimaan dengan ID yang diberikan ada dalam database
      const existingPenerimaan = await Penerimaan.findById(penerimaan);
      const existingProduct = await Product.findById(product);
      if (!existingPenerimaan || !existingProduct) {
        return res.status(404).json({ message: 'Penerimaan not found' });
      }
  
      // Hitung harga per pcs berdasarkan total_price dan tax
      const pricePerPcs = (existingPenerimaan.total_price * (1 + existingPenerimaan.tax / 100)) / (20 * quantity_micro);
  
      // Buat stock product baru dengan harga per pcs yang dihasilkan dari perhitungan di atas
      const newStockProduct = await StockProd.create({
        penerimaan,
        product,
        expired_at,
        quantity_micro,
        price: pricePerPcs,
      });
  
      res.status(201).json(newStockProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  

// Controller untuk mendapatkan semua stok produk
const getAllStockProds = async (req, res) => {
  try {
    const stockProds = await StockProd.find().populate('product');
    res.status(200).json(stockProds);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllStockProds,
  addStockProduct,
};
