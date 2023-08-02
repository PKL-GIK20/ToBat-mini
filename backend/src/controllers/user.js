const Users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
  try {
    let user = req.body;
    let result = user.password.match(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,32}$/
    );
    if (result) {

      const salt = bcrypt.genSaltSync(parseInt(process.env.SALT));
      const password = bcrypt.hashSync(user.password, salt);
      user.password = password;
      const saveUser = await Users.create(user);
      res
        .status(201)
        .json({ message: "Successfully registered a new user", saveUser });
    } else {
      res.status(400).json({ message: "Please input a valid password" });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) res.status(404).json({ message: "email not found" });
    else {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        let token = jwt.sign(
          {
            id: user._id,
          },
          process.env.SECRET,
          {
            expiresIn: "4h",
          }
        );
        res.status(200).json({ token });
      } else {
        res.status(403).json({ message: "Wrong Password" });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    let user = req.body;

    if (user.password) {
      let result = user.password.match(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,32}$/
      );
      if (result) {
        const salt = bcrypt.genSaltSync(parseInt(process.env.SALT));
        const password = bcrypt.hashSync(user.password, salt);

        if (!user.oldPassword) {
          return res.status(400).json({ message: "Old password is required" });
        }

        // Memeriksa kecocokan password lama sebelum melakukan pembaruan
        const isMatch = await bcrypt.compare(
          user.oldPassword,
          req.user.password
        );
        if (!isMatch) {
          return res.status(400).json({ message: "Old password is incorrect" });
        }

        user.password = password; // Update password baru
      } else {
        return res.status(400).json({ message: "Password not valid" });
      }
    } else {
      user.password = req.user.password;
    }

    let keys = Object.keys(user);
    await Users.validate(user, keys);
    const result = await Users.findByIdAndUpdate(req.user.id, user); // Update profil pengguna
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Users.findByIdAndDelete(userId);

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const findUsersByUsername = async (req, res) => {
  try {
    const users = await Users.find({
      username: { $regex: req.params.username, $options: "$i" },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllUsername = async (req, res) => {
  try {
    const users = await Users.find({}, { username: 1 });
    let usernames = [];
    users.forEach((user) => usernames.push(user.username));
    usernames.splice(usernames.indexOf(req.user.username), 1);
    res.status(200).json(usernames);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



const userController = {
  register,
  login,
  updateProfile,
  deleteProfile,
  getUserProfile,
  getAllUsers,
  getAllUsername,
  findUsersByUsername,
};

module.exports = userController;
