const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

exports.verifyToken = (req, res, next) => {
  const header = req.headers["x-access-token"] || req.headers.authorization;
  if (typeof header == "undefined")
    return res.status(401).json({ success: false, msg: "No token provided!" });
  try {
    let decoded = jwt.verify(header, process.env.SECRET);
    req.loggedUser = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Bad token authentication" });
  }
};
