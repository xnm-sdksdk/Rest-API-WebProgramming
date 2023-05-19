const Users = require("../models/users");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Create a new user
exports.registerUser = async (req, res, next) => {
  try {
    if (
      !req.body &&
      !req.body.name &&
      !req.body.email &&
      !req.body.password &&
      !req.body.password_confirmation
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Fields are mandatory." });
    }

    await Users.registerUser({})

    const { name, email, password, password_confirmation, role } = req.body;
    const accommodations = [];
    const events = [];
    const user = new User({
      name,
      email,
      password,
      password_confirmation,
      role,
      accommodations,
      events,
    });
    await user.save();

    const authKey = uuidv4();

    const response = {
      name: user.name,
      email: user.email,
      role: user.role,
      accommodations: user.accommodations,
      events: user.events,
      auth_key: authKey,
    };
    res.status(201).json(response);
  } catch (err) {
    res
      .status(500)
      .json({ err: "Something went wrong. Please try again later." });
  }
};

// Login
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      res.status(404).json({ err: "Account does not exist." });
      return;
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      res.status(401).json({ err: "Incorrect password." });
      return;
    }

    const token = jwt.sign({ userId: user._id }, "key", { expiresIn: "1h" });

    const response = {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };

    res.json(response);
  } catch (err) {
    res
      .status(500)
      .json({ err: "Something went wrong. Please try again later." });
  }
};

exports.logoutUser = (req, res, next) => {};

exports.refreshToken = (req, res, next) => {};

// Get All
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ err: "Users not found!" });
  }
};

// Get single user
exports.getUserById = (req, res, next) => {};

exports.updateUserById = (req, res, next) => {};

exports.deleteUserById = (req, res, next) => {};

exports.addInterest = (req, res, next) => {};

exports.removeInterest = (req, res, next) => {};
