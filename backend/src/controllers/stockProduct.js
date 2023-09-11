const StockProd = require('../models/stockProduct');
const mongoose = require('mongoose');
const Stock = require('../models/stock');



// Controller untuk menambahkan stok produk baru
const addStockProduct = async (req, res) => {
  const { stock, available_macro } = req.body;

  try {
    // Periksa apakah ID stock yang diterima adalah ID yang valid
    const isValidStockId = mongoose.Types.ObjectId.isValid(stock);
    if (!isValidStockId) {
      return res.status(400).json({ message: 'Invalid stock ID' });
    }

    // Periksa apakah stock dengan ID yang diberikan ada dalam database
    const existingStock = await Stock.findById(stock);
    if (!existingStock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    // Hitung harga per pcs berdasarkan total_price dan tax
    const total_price = existingStock.total_price;
    const tax = existingStock.tax;
    const totalPriceAfterTax = total_price + (total_price * tax / 100);
    const pricePerPcs = totalPriceAfterTax / (available_macro * 10); // 1 available_macro = 10 quantity_micro

    // Hitung quantity_micro
    const quantity_micro = available_macro * 10;

    // Kurangkan quantity_macro sesuai dengan available_macro
    existingStock.quantity_macro -= available_macro;

    // Simpan perubahan quantity_macro ke basis data
    await existingStock.save();

    // Buat stock product baru dengan harga per pcs dan quantity_micro yang dihasilkan dari perhitungan di atas
    const newStockProduct = await StockProd.create({
      stock,
      available_macro,
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
    const stockProds = await StockProd.find()
      .populate({
        path: 'stock', // Ubah 'product' menjadi 'stock' sesuai dengan nama field yang digunakan
        populate: {
          path: 'product',
          populate: {
            path: 'category',
            select: 'name' // Memilih hanya field 'name' dari kategori
          }
        }
      });

    res.status(200).json(stockProds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = {
  getAllStockProds,
  addStockProduct,
};
