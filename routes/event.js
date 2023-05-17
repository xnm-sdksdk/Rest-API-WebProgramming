const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/event");

// Get ALL Events
router.get("/api/v1/events", eventsController.getAccommodations);

// Get Events BY ID
router.get("/api/v1/events/:id", eventsController.getAccommodationById);

// POST Events
router.post("/api/v1/events", eventsController.createAccommodation);

// PUT Events BY ID
router.put("/api/v1/events/:id", eventsController.updateAccommodationById);

// Delete Events BY ID
router.delete("/api/v1/events/:id", eventsController.deleteAccommodationById);

module.exports = router;
