const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/event");

// Get ALL Events
//router.route("/api/v1/events").get(eventsController.getEvents);

// Get Events BY ID
router.route("/api/v1/events/:id").get(eventsController.getEventById);

// POST Events
router.route("/api/v1/events").post(eventsController.createEvent);

// PATCH Updating Events BY ID
router
  .route("/api/v1/events/:id")
  .patch(eventsController.updateEventById);

// Delete Events BY ID
router
  .route("/api/v1/events/:id")
  .delete(eventsController.deleteEventById);

module.exports = router;
