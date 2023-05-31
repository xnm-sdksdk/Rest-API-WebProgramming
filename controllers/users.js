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
      role: 1,
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
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
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

    const isValidPassword = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isValidPassword) {
      res.status(401).json({ err: "Incorrect password." });
    }

    //const token = jwt.sign({ userId: user._id }, "key", { expiresIn: 8600 });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET, {
      expiresIn: 3600,
    });
    const response = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({ success: true, message: response, accessToken: token });
  } catch (err) {
    console.log(err);
    // res
    //   .status(500)
    //   .json({ err: "Something went wrong. Please try again later." });
  }
};

exports.refreshToken = (req, res, next) => {};

// Get All
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err: "Users not found!" });
  }
};

// Get single user
exports.getUserById = (req, res, next) => {};

exports.updateUserById = (req, res, next) => {};

exports.deleteUserById = (req, res, next) => {
  // User.update(req.body, {where: {id: req.params.id, deleted: 0}}).then(())
};

exports.addInterest = (req, res, next) => {};

exports.removeInterest = (req, res, next) => {};
