const Product = require('../models/product');
const Category = require('../models/category');
const mongoose = require('mongoose');


const addProduct = async (req, res) => {
  const { name, image, category } = req.body;
  try {
    const isValidCategoryId = mongoose.Types.ObjectId.isValid(category);
    if (!isValidCategoryId) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const newProduct = await Product.create({ name, image, category });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name');
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller untuk mendapatkan produk berdasarkan ID
const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId).populate('category', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller untuk menghapus produk berdasarkan ID
const deleteProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller untuk mengupdate produk berdasarkan ID
const updateProductById = async (req, res) => {
  const productId = req.params.id;
  const { name, image, category } = req.body;
  try {
    // Periksa apakah ID kategori yang diterima adalah ID yang valid
    const isValidCategoryId = mongoose.Types.ObjectId.isValid(category);
    if (!isValidCategoryId) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    // Periksa apakah kategori dengan ID yang diberikan ada dalam database
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Periksa apakah produk dengan ID yang diberikan ada dalam database
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update data produk dengan data yang baru
    existingProduct.name = name;
    existingProduct.image = image;
    existingProduct.category = category;
    await existingProduct.save();

    res.status(200).json(existingProduct);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
};
