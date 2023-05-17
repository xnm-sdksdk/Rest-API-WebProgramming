const express = require("express");
const path = require("path");
const router = express.Router();
const usersController = require("../controllers/users");

// POST Register new Users
router.post("/api/v1/users", usersController.registerUser);

// POST Login User
router.post("/api/v1/login", usersController.loginUser);

// POST Logout User
router.post("/api/v1/logout", usersController.logoutUser);

// PUT Refresh auth token
router.put("/api/v1/refresh-token", usersController.refreshToken);

// GET ALL Users
router.get("/api/v1/users/", usersController.getUsers);

// GET User BY ID
router.get("/api/v1/users/:id", usersController.getUserById);

// PUT Users BY ID
router.put("/api/v1/users/:id", usersController.updateUserById);

// DELETE Users BY ID
router.delete("/api/v1/delete/:id", usersController.deleteUserById);

// POST Show interest in an Event
router.post("/api/v1/users/:userId/interests/:eventId", usersController.addInterest);

// DELETE Remove interest in an Event
router.delete(
  "/api/v1/users/:userId/interests/:eventId",
  usersController.removeInterest
);

module.exports = router;
