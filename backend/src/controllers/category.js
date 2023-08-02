const Category = require('../models/category');

// Controller untuk menampilkan semua kategori produk
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller untuk menambahkan kategori produk baru
const addCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller untuk menghapus kategori produk berdasarkan ID
const deleteCategoryById = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller untuk mengupdate kategori produk berdasarkan ID
const updateCategoryById = async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;
  try {
    // Periksa apakah kategori dengan ID yang diberikan ada dalam database
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Update data kategori dengan data yang baru
    existingCategory.name = name;
    await existingCategory.save();

    res.status(200).json(existingCategory);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  deleteCategoryById,
  updateCategoryById,
};
