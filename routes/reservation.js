const express = require("express");
const router = express.Router();
const reservationsController = require("../controllers/reservation");

// Get ALL Reservations
router
  .route("/api/v1/reservations")
  .get(reservationsController.getAccommodations);

// Get Reservations BY ID
router
  .route("/api/v1/reservations/:id")
  .get(reservationsController.getAccommodationById);

// POST Reservations
router
  .route("/api/v1/reservations")
  .post(reservationsController.createAccommodation);

// PUT Reservations BY ID
router
  .route("/api/v1/reservations/:id")
  .put(reservationsController.updateAccommodationById);

// Delete Reservations BY ID
router
  .route("/api/v1/reservations/:id")
  .delete(reservationsController.deleteAccommodationById);

module.exports = router;
