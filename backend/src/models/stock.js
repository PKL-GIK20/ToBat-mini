const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  jumlah: { type: Number, required: true },
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
