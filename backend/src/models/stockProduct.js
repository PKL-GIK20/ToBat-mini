const mongoose = require('mongoose');

const stockProdSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  expired_at: { type: Date, required: true },
  quantity_micro: { type: Number, required: true },
});

const StockProd = mongoose.model('StockProd', stockProdSchema);

module.exports = StockProd;
