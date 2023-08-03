const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const autoIncrement = require('mongoose-auto-increment');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;
const DBNAME = process.env.DBNAME || "ToBat";
const mongouri =
  process.env.MONGO_URI || `mongodb://127.0.0.1:27017/${DBNAME}?ssl=false`;

// Inisialisasi koneksi ke database
mongoose.connect(mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Ambil instance koneksi dari mongoose
const db = mongoose.connection;

// Tangani event error saat koneksi gagal
db.on('error', console.error.bind(console, 'Koneksi database gagal:'));

// Tangani event saat koneksi berhasil
db.once('open', () => {
  console.log('Koneksi database berhasil!');
});

// Inisialisasi mongoose-auto-increment dengan instance koneksi
autoIncrement.initialize(db);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", require("./src/routes/index"));
app.use("/public", express.static("public"));
app.use("/dokumen", express.static("dokumen"));
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

app.listen(PORT, () => {
  console.log("Port run on " + PORT);
});
