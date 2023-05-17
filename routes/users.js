const express = require("express");
const path = require("path");
const router = express.Router();
const usersController = require("../controllers/users");

// POST Register new Users
router.route("/api/v1/users").post(usersController.registerUser);

// POST Login User
router.route("/api/v1/login").post(usersController.loginUser);

// POST Logout User
router.route("/api/v1/logout").post(usersController.logoutUser);

// PUT Refresh auth token
router.route("/api/v1/refresh-token").put(usersController.refreshToken);

// GET ALL Users
router.route("/api/v1/users/").get(usersController.getUsers);

// GET User BY ID
router.route("/api/v1/users/:id").get(usersController.getUserById);

// PUT Users BY ID
router.route("/api/v1/users/:id").put(usersController.updateUserById);

// DELETE Users BY ID
router.route("/api/v1/delete/:id").delete(usersController.deleteUserById);

// POST Show interest in an Event
router
  .route("/api/v1/users/:userId/interests/:eventId")
  .post(usersController.addInterest);

// DELETE Remove interest in an Event
router
  .route("/api/v1/users/:userId/interests/:eventId")
  .delete(usersController.removeInterest);

module.exports = router;
