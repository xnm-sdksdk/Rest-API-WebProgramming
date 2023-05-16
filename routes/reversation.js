const express = require("express");
const router = express.Router();
const reservationsController = require("../controllers/event");

// Get ALL Reservations
router.get("/reservations", reservationsController.getAccommodations);

// Get Reservations BY ID
router.get("/reservations/:id", reservationsController.getAccommodationById);

// POST Reservations
router.post("/reservations", reservationsController.createAccommodation);

// PUT Reservations BY ID
router.put("/reservations/:id", reservationsController.updateAccommodationById);

// Delete Reservations BY ID
router.delete("/reservations/:id", reservationsController.deleteAccommodationById);

module.exports = router;
