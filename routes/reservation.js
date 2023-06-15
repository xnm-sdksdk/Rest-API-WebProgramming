const express = require("express");
const router = express.Router();
const reservationsController = require("../controllers/reservation");
const auth = require("../controllers/auth");

// Get ALL Reservations
router.route("/").get(reservationsController.getAccommodations);

// Get Reservations BY ID
router.route("/:id").get(reservationsController.getAccommodationById);

// POST Reservations
router
  .route("/")
  .post(auth.verifyToken, reservationsController.createAccommodation);

// PUT Updating Reservations BY ID
router
  .route("/:id")
  .put(auth.verifyToken, reservationsController.updateAccommodationById);

// Delete Reservations BY ID
router
  .route("/:id")
  .delete(auth.verifyToken, reservationsController.deleteAccommodationById);

module.exports = router;
