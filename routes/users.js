const express = require("express");
const router = express.Router();
const multer = require("multer");
//const { check } = require("express-validator/check");
const usersController = require("../controllers/users");
// const multerUploads = multer({ storage }).single("image");

// POST Register new Users
router.route("/").post(usersController.registerUser);
// multerUploads,
// POST Login User
router.route("/login").post(usersController.loginUser);

// GET ALL Users
router.route("/").get(usersController.getUsers);

// GET User BY ID
router.route("/:id").get(usersController.getUserById);

// PUT Users BY ID
router.route("/:id").put(usersController.updateUserById);

// DELETE Users BY ID
router.route("/:id").delete(usersController.deleteUserById);

module.exports = router;
