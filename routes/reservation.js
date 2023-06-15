const express = require("express");
const router = express.Router();
const reservationsController = require("../controllers/reservation");
const auth = require("../controllers/auth");

// Get ALL Reservations
router.route("/").get(reservationsController.getReservations);

// Get Reservations BY ID
router.route("/:id").get(reservationsController.getReservationById);

// POST Reservations
router
  .route("/")
  .post(auth.verifyToken, reservationsController.createReservation);

// PUT Updating Reservations BY ID
router
  .route("/:id")
  .put(auth.verifyToken, reservationsController.updateReservationById);

// Delete Reservations BY ID
router
  .route("/:id")
  .delete(auth.verifyToken, reservationsController.deleteReservationById);

module.exports = router;
