const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const autoIncrement = require('mongoose-auto-increment');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const bodyParser = require('body-parser');
const multer = require('multer');
const { v4: uuidv4 } = require("uuid");




require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;
const DBNAME = process.env.DBNAME || "ToBat";
const mongouri =
  process.env.MONGO_URI || `mongodb://127.0.0.1:27017/${DBNAME}?ssl=false`;

mongoose.connect(mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Koneksi database gagal:'));

db.once('open', () => {
  console.log('Koneksi database berhasil!');
});

autoIncrement.initialize(db);


app.use(bodyParser.urlencoded({ extended: false }));
const DIR = "./uploads/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  }
});
app.use(express.static('uploads'))
app.use(upload.array('image'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", require("./src/routes/index"));
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});



app.listen(PORT, () => {
  console.log("Port run on " + PORT);
});

const swagger = require('./swagger');

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
