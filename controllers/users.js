// const Users = require("../models/users");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/config");
// const User = db.user;
const db = require("../models/index");
const User = db.users;

// Create a new user
exports.registerUser = async (req, res) => {
  try {
    if (!req.body && !req.body.name && !req.body.email && !req.body.password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory." });
    }

    // Needs review

    // await Users.registerUser({
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: bcrypt.hashSync(req.body.password, 12),
    //   role: req.body.role || "regular",
    // });

    const { name, email, password } = req.body;
    const accommodations = [];
    const events = [];
    const user = new User({
      name: name,
      email: email,
      password: password,
      // password_confirmation,
      role: "regular",
      accommodations: [],
      events: [],
    });
    console.log(user);
    await user.save();
    console.log(user);
    // const authKey = uuidv4();

    const response = {
      name: user.name,
      email: user.email,
      role: user.role,
      accommodations: user.accommodations,
      events: user.events,
      // auth_key: authKey,
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
    if (!req.body || !req.body.name || !req.body.password) {
      return res.status(400).json({
        success: false,
        message: "Name and password must be provided.",
      });
    }

    // Verification for the name
    let user = await User.findOne({ where: { name: req.body.name } });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User with the given name not found.",
      });

    const isValidPassword = bcrypt.compareSync(req.body.password, user.password);

    if (!isValidPassword) {
      res.status(401).json({ err: "Incorrect password." });
    }

    //const token = jwt.sign({ userId: user._id }, "key", { expiresIn: "1h" });

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
