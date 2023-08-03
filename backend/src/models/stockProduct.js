const mongoose = require('mongoose');

const stockProdSchema = new mongoose.Schema({
  penerimaan: { type: mongoose.Schema.Types.ObjectId, ref: 'Penerimaan', required: true },
  expired_at: { type: Date, required: true },
  quantity_micro: { type: Number, required: true },
  price: { type: Number, required: true },
});

const StockProd = mongoose.model('StockProd', stockProdSchema);

module.exports = StockProd;

// Menambahkan hook (pre-save) untuk generate price berdasarkan total_price dan tax
stockProdSchema.pre('save', async function (next) {
  try {
    // Ambil data Penerimaan berdasarkan penerimaan ID
    const penerimaan = await this.model('Penerimaan').findById(this.penerimaan);
    if (!penerimaan) {
      throw new Error('Invalid penerimaan ID');
    }

    const box = penerimaan.quantity_macro
    const total_price = penerimaan.total_price;
    const tax = penerimaan.tax;
    const total_price_after_tax = total_price + (total_price * tax / 100);
    this.price = total_price_after_tax / box / this.quantity_micro;

    next();
  } catch (err) {
    next(err);
  }
});
