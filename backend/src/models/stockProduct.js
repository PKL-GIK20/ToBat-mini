const mongoose = require('mongoose');

const stockProdSchema = new mongoose.Schema({
  stock: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock', required: true },
  quantity_micro: { type: Number, required: false },
  price: { type: Number, required: false },
});

const StockProd = mongoose.model('StockProd', stockProdSchema);

module.exports = StockProd;