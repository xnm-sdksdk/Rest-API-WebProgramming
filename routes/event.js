const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/event");

// Get ALL Events
router.get("/events", eventsController.getAccommodations);

// Get Events BY ID
router.get("/events/:id", eventsController.getAccommodationById);

// POST Events
router.post("/events", eventsController.createAccommodation);

// PUT Events BY ID
router.put("/events/:id", eventsController.updateAccommodationById);

// Delete Events BY ID
router.delete("/events/:id", eventsController.deleteAccommodationById);

module.exports = router;
