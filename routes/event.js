const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/event");
const auth = require("../controllers/auth");

// Get ALL Events
router.route("/").get(eventsController.getEvents);

// Get Events BY ID
router.route("/:id").get(eventsController.getEventById);

// POST Events
router.route("/").post(auth.verifyToken, eventsController.createEvent);

// PUT Updating Events BY ID
router.route("/:id").put(auth.verifyToken, eventsController.updateEventById);

// Delete Events BY ID
router.route("/:id").delete(auth.verifyToken, eventsController.deleteEventById);

// Search Events By ID
router.route("/search").get(eventsController.searchEvent);

// POST Attend Event 
router.route("/:eventId/attend").post(eventsController.attendEvent);

module.exports = router;
