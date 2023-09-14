const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique:true },
  image: { type: String }, 
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  kode_obat: { type: String },
  created_at: { type: Date, default: Date.now },
});

productSchema.plugin(autoIncrement.plugin, {
  model: 'Product',
  field: 'productId',
  startAt: 1,
  incrementBy: 1,
  unique: false,
});

productSchema.pre('save', async function (next) {
  try {
    const category = await this.model('Category').findById(this.category);
    if (!category) {
      throw new Error('Invalid category ID');
    }
    const categoryCode = category.kode;

    const latestProduct = await this.constructor.findOne({ category: this.category }).sort({ _id: -1 });
    let sequence = 1;
    if (latestProduct) {
      sequence = latestProduct.productId + 1;
    }

    this.kode_obat = `${categoryCode}-${sequence.toString().padStart(3, '0')}`;
    next();
  } catch (err) {
    next(err);
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
