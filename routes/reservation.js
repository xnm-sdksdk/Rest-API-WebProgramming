const express = require("express");
const router = express.Router();
const reservationsController = require("../controllers/reservation");

// Get ALL Reservations
/*
router
  .route("/")
  .get(reservationsController.getAccommodations);

// Get Reservations BY ID
router
  .route("/:id")
  .get(reservationsController.getAccommodationById);

// POST Reservations
router
  .route("/")
  .post(reservationsController.createAccommodation);

// PATCH Updating Reservations BY ID
router
  .route("/:id")
  .patch(reservationsController.updateAccommodationById);

// Delete Reservations BY ID
router
  .route("/:id")
  .delete(reservationsController.deleteAccommodationById);

module.exports = router;
*/
