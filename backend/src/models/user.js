const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["supplier", "admin"],
    default: "admin",
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema, "Users");
