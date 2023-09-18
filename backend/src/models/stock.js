const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  total_price: { type: Number, required: true, min:1 },
  tax: { type: Number, default: 10 },
  discount: { type: Number, required:true, min:1},
  quantity_macro: { type: Number, required: true, min:1 },
  satuan: { type: String, default: 'box' }, 
  expired_at: { type: Date, required: true },
  fix_price: { type: Number, required: false },
  created_at: { type: Date, default: Date.now },


});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;

const groupBatchByExpiredAt = async () => {
  try {
    const result = await Stock.aggregate([
      {
        $group: {
          _id: { expired_at: '$expired_at' },
          total_quantity_macro: { $sum: '$quantity_macro' },
        },
      },
      {
        $project: {
          _id: 0, // Untuk menghilangkan _id dari hasil keluaran
          expired_at: '$_id.expired_at',
          total_quantity_macro: 1,
        },
      },
      {
        $sort: { expired_at: 1 }, 
      },
    ]);

    console.log(result);
  } catch (err) {
    console.error('Error:', err);
  }
};

groupBatchByExpiredAt();