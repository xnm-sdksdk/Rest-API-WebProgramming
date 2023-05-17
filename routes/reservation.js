const express = require("express");
const router = express.Router();
const reservationsController = require("../controllers/reservation");

// Get ALL Reservations
router.get("/api/v1/reservations", reservationsController.getAccommodations);

// Get Reservations BY ID
router.get("/api/v1/reservations/:id", reservationsController.getAccommodationById);

// POST Reservations
router.post("/api/v1/reservations", reservationsController.createAccommodation);

// PUT Reservations BY ID
router.put("/api/v1/reservations/:id", reservationsController.updateAccommodationById);

// Delete Reservations BY ID
router.delete("/api/v1/reservations/:id", reservationsController.deleteAccommodationById);

module.exports = router;
