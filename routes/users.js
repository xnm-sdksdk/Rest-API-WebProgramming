const express = require("express");
const router = express.Router();
const multer = require("multer");
//const { check } = require("express-validator/check");
const usersController = require("../controllers/users");
const multerUploads = multer({ storage }).single("image");

// POST Register new Users
router.route("/").post(multerUploads, usersController.registerUser);

// POST Login User
router.route("/login").post(usersController.loginUser);

// PUT Refresh auth token
router.route("/refresh-token").put(usersController.refreshToken);

// GET ALL Users
router.route("/").get(usersController.getUsers);

// GET User BY ID
router.route("/:id").get(usersController.getUserById);

// PUT Users BY ID
router.route("/:id").put(usersController.updateUserById);

// DELETE Users BY ID
router.route("/:id").delete(usersController.deleteUserById);

// POST Show interest in an Event
router.route("/:userId/interests/:eventId").post(usersController.addInterest);

// DELETE Remove interest in an Event
router
  .route("/:userId/interests/:eventId")
  .delete(usersController.removeInterest);

module.exports = router;
