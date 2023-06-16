const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models/index");
const User = db.users;
const config = require("../config/config");
const userModel = require("../models/users");

// Create a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let user_img = null;

    if (req.file) {
      user_img = await cloudinary.uploader.upload(req.file.path);
    }

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Email format invalid.",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email is already being used.",
      });
    }

    const validRoles = [1, 2, 3];
    const roleSelection = validRoles.includes(role) ? role : 1;

    const accommodations = [];
    const events = [];
    const newUser = new User({
      name: name,
      email: email,
      password: bcrypt.hashSync(req.body.password, 8),
      role: roleSelection,
      accommodations: accommodations,
      events: events,
      profile_image: user_img ? user_img.url : null,
      cloudinary_id: user_img ? user_img.public_id : null,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);

    const response = {
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
      accommodations: savedUser.accommodations,
      events: savedUser.events,
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

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.SECRET,
      {
        expiresIn: 3600,
      }
    );
    const response = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };

    res
      .status(200)
      .json({ success: true, message: response, accessToken: token });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err: "Something went wrong. Please try again later." });
  }
};

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
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("accommodations")
      .populate("events.items.eventId");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong. Please try again later.",
    });
  }
};

exports.updateUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const update = req.body;

    const user = await User.findByIdAndUpdate(userId, update, { new: true }); // Force the return in the response

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong. Please try again later",
    });
  }
};

exports.deleteUserById = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const user = await User.findByIdAndDelete(req.params.id);
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    res
      .status(202)
      .json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
