const crypto = require("crypto");
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

exports.postReset = (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          res.status(404).json({
            success: false,
            message: "No account with that email was found.",
          });
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        // Send the Token reset email for the user
        // Need to implement the transporter | nodemailer was not working
        // Place the token in the res message 
      })
      .catch((err) => {});
  });
};
