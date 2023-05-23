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

exports.postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Credentials missing or incorrect." });
    }
    bcrypt
      .compare(password, user.password)
      .then((match) => {
        if (match) {
          return res
            .status(200)
            .json({ success: true, message: "Credentials Valid." });
        }
        res.status(401).json({
          success: false,
          message: "Credentials missing or incorrect.",
        });
      })
      .catch((err) =>
        res.status(500).json({
          success: false,
          message: "Something went wrong. Please try again later.",
        })
      );
  });
};
