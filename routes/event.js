const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/event");

// Get ALL Events
router.route("/").get(eventsController.getEvents);

// Get Events BY ID
router.route("/:id").get(eventsController.getEventById);

// POST Events
router.route("/").post(eventsController.createEvent);

// PATCH Updating Events BY ID
router.route("/:id").patch(eventsController.updateEventById);

// Delete Events BY ID
router.route("/:id").delete(eventsController.deleteEventById);

module.exports = router;
