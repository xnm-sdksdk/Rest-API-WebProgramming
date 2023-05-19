const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/event");

// Get ALL Events
router.route("/api/v1/events").get(eventsController.getAccommodations);

// Get Events BY ID
router.route("/api/v1/events/:id").get(eventsController.getAccommodationById);

// POST Events
router.route("/api/v1/events").post(eventsController.createAccommodation);

// PATCH Updating Events BY ID
router
  .route("/api/v1/events/:id")
  .patch(eventsController.updateAccommodationById);

// Delete Events BY ID
router
  .route("/api/v1/events/:id")
  .delete(eventsController.deleteAccommodationById);

module.exports = router;
