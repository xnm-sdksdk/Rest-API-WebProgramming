const express = require("express");
const path = require("path");
const router = express.Router();
const usersController = require("../controllers/users");

// POST Register new Users
router.post("/register", usersController.registerUser);

// POST Login User
router.post("/login", usersController.loginUser);

// POST Logout User
router.post("/logout", usersController.logoutUser);

// PUT Refresh auth token
router.put("/refresh-token", usersController.refreshToken);

// GET ALL Users
router.get("/users/", usersController.getUsers);

// GET User BY ID
router.get("/users/:id", usersController.getUserById);

// PUT Users BY ID
router.put("/users/:id", usersController.updateUserById);

// DELETE Users BY ID
router.delete("/delete/:id", usersController.deleteUserById);

module.exports = router;
