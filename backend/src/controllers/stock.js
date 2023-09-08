const Stock = require('../models/stock');
const Product = require('../models/product');

// Menampilkan semua data stock
const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find()      
    .populate({
        path: 'product',
        populate: {
          path: 'category',
          select: 'name' // Memilih hanya field 'name' dari kategori
        }
      }); // Menggunakan populate untuk mendapatkan data produk terkait (hanya field 'name')
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Menambahkan data stock baru
const addStock = async (req, res) => {
  const { product, jumlah, satuan } = req.body;
  try {
    // Periksa apakah ID produk yang diberikan ada dalam database
    const existingProduct = await Product.findById(product);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    // Buat data stock baru dengan mengaitkannya dengan produk yang valid
    const newStock = await Stock.create({ product, jumlah, satuan });
    res.status(201).json(newStock);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllStocks,
  addStock,
};