const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

// Gunakan plugin mongoose-auto-increment
categorySchema.plugin(autoIncrement.plugin, {
  model: 'Category',
  field: 'categoryId', // Nama field yang akan menjadi ID kategori baru yang di-increment
  startAt: 1, // Nilai awal untuk increment
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
