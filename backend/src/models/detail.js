const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema({
  price: { type: Number, required: true },
});

const Detail = mongoose.model('Detail', detailSchema);

module.exports = Detail;