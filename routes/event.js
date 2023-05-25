const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/event");

// Get ALL Events
//router.route("/events").get(eventsController.getEvents);

// Get Events BY ID
router.route("/events/:id").get(eventsController.getEventById);

// POST Events
router.route("/events").post(eventsController.createEvent);

// PATCH Updating Events BY ID
router.route("/events/:id").patch(eventsController.updateEventById);

// Delete Events BY ID
router.route("/events/:id").delete(eventsController.deleteEventById);

module.exports = router;
