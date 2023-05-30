const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models/index");
const User = db.users;
const config = require("../config/config");

// Create a new user
exports.registerUser = async (req, res) => {
  try {
    let user = await User.findOne({ where: { email: req.body.email } });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email insert is already being used.",
      });
    }

    // if (!req.body && !req.body.email && !req.body.password) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "All fields are mandatory." });
    // }

    const { name, email, password } = req.body;
    const accommodations = [];
    const events = [];
    user = new User({
      name: name,
      email: email,
      password: bcrypt.hashSync(req.body.password, 8),
      role: "regular",
      accommodations: accommodations,
      events: events,
    });
    console.log(user);
    await user.save();
    console.log(user);

    const response = {
      name: user.name,
      email: user.email,
      role: user.role,
      accommodations: user.accommodations,
      events: user.events,
    };
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err: "Something went wrong. Please try again later." });
  }
};

// Login
exports.loginUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ where: { email: req.body.email } });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User with the given email not found.",
      });

    if (!req.body || !req.body.email || !req.body.password) {
      return res.status(400).json({
        success: false,
        message: "Name and password must be provided.",
      });
    }

    // Verification for the name

    const isValidPassword = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isValidPassword) {
      res.status(401).json({ err: "Incorrect password." });
    }

    //const token = jwt.sign({ userId: user._id }, "key", { expiresIn: 8600 });

    const response = {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };

    return res.status(200).json(response);
  } catch (err) {
    res
      .status(500)
      .json({ err: "Something went wrong. Please try again later." });
  }
};

exports.refreshToken = (req, res, next) => {};

// Get All
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
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
