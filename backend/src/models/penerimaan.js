const mongoose = require('mongoose');

const penerimaanSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  stock: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock', required: true },
  total_price: { type: Number, required: true },
  tax: { type: Number, default: 10 },
  discount: { type: Number, default: 0 },
  quantity_macro: { type: Number, required: true },
});

const Penerimaan = mongoose.model('Penerimaan', penerimaanSchema);

module.exports = Penerimaan;