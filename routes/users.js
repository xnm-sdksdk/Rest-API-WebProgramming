const express = require("express");
const path = require("path");
const router = express.Router();
const usersController = require("../controllers/users");

// POST Register new Users
router.route("/").post(usersController.registerUser);

// POST Login User
router.route("/login").post(usersController.loginUser);

// PUT Refresh auth token
router.route("/refresh-token").put(usersController.refreshToken);

// GET ALL Users
router.route("/users").get(usersController.getUsers);

// GET User BY ID
router.route("/users/:id").get(usersController.getUserById);

// PATCH Users BY ID
router.route("/users/:id").patch(usersController.updateUserById);

// DELETE Users BY ID
router.route("/delete/:id").delete(usersController.deleteUserById);

// POST Show interest in an Event
router
  .route("/users/:userId/interests/:eventId")
  .post(usersController.addInterest);

// DELETE Remove interest in an Event
router
  .route("/users/:userId/interests/:eventId")
  .delete(usersController.removeInterest);

module.exports = router;
