const Stock = require('../models/stock');
const Product = require('../models/product');
const mongoose = require('mongoose');


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

// Controller untuk menambahkan penerimaan produk baru
const addStock = async (req, res) => {
  const { product, total_price, tax, discount, quantity_macro, satuan, expired_at, created_at } = req.body;
  try {
    // Periksa apakah ID produk adalah ID yang valid
    const isValidProductId = mongoose.Types.ObjectId.isValid(product);
    if (!isValidProductId) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    // Periksa apakah produk dengan ID yang diberikan ada dalam database
    const existingProduct = await Product.findById(product);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Hitung total_price setelah mengenakan diskon dan pajak
    const totalPriceAfterDiscount = total_price - (total_price * discount / 100); // Harga setelah diskon

    // Hitung fix_price berdasarkan total_price, discount, dan tax
    const fix_price = Math.round(totalPriceAfterDiscount * (1 + tax / 100)); // Memasukkan Math.round() untuk membulatkan

    // Buat stok baru dengan total_price yang diinputkan dan fix_price yang dihitung
    const newStock = await Stock.create({
      product,
      total_price,
      fix_price,
      tax,
      discount,
      quantity_macro,
      satuan,
      expired_at,
      created_at,
    });

    res.status(201).json(newStock);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



module.exports = {
  getAllStocks,
  addStock,
};