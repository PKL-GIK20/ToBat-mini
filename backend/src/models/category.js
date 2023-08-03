const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  kode: { type: String, unique: true, sparse: true },
});

categorySchema.pre('save', function (next) {
  const categoryPrefix = this.name.slice(0, 2).toUpperCase();
  this.kode = categoryPrefix;
  next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
