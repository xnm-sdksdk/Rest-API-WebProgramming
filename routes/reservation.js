const express = require("express");
const router = express.Router();
const reservationsController = require("../controllers/reservation");

// Get ALL Reservations
/*
router
  .route("/reservations")
  .get(reservationsController.getAccommodations);

// Get Reservations BY ID
router
  .route("/reservations/:id")
  .get(reservationsController.getAccommodationById);

// POST Reservations
router
  .route("/reservations")
  .post(reservationsController.createAccommodation);

// PATCH Updating Reservations BY ID
router
  .route("/reservations/:id")
  .patch(reservationsController.updateAccommodationById);

// Delete Reservations BY ID
router
  .route("/reservations/:id")
  .delete(reservationsController.deleteAccommodationById);

module.exports = router;
*/
