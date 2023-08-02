const StockProd = require('../models/stockProduct');

// Controller untuk menambahkan stok produk baru
const addStockProd = async (req, res) => {
  const { price, expired_at, quantity_micro } = req.body;
  try {
    const newStockProd = await StockProd.create({
      price,
      expired_at,
      quantity_micro,
    });

    res.status(201).json(newStockProd);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller untuk mendapatkan semua stok produk
const getAllStockProds = async (req, res) => {
  try {
    const stockProds = await StockProd.find();
    res.status(200).json(stockProds);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  addStockProd,
  getAllStockProds,
};
