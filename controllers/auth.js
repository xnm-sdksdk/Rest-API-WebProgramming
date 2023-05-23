const bcrypt = require("bcrypt");
const User = require("../models/users");

exports.postSignUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        res.status().json({
          success: false,
          message: "Account with the given email already exists.",
        });
      }
      return bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          email: email,
          password: hashedPassword,
          events: { items: [] },
        });
        return user.save();
      });
    })
    .then((result) => {
      res
        .status(201)
        .json({ success: true, message: "Account created successfully." });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    });
};
