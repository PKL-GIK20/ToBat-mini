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
    validate: {
      validator: function (password) {
        // At least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password);
      },
      message: "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (e.g., !@#$%^&*).",
    },
  },
  role: {
    type: String,
    enum: ["supplier", "admin"],
    default: "admin",
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema, "Users");
