const express = require("express");
const router = express.Router();
const accommodationsController = require("../controllers/accommodation");
const auth = require("../controllers/auth");

// Get ALL Accommodations
router.route("/").get(accommodationsController.getAccommodations);

// Get Accommodation BY ID
router.route("/:id").get(accommodationsController.getAccommodationById);

// POST Accommodation
router
  .route("/")
  .post(auth.verifyToken, accommodationsController.createAccommodation);

// PUT Updating Accommodation BY ID
router
  .route("/:id")
  .put(auth.verifyToken, accommodationsController.updateAccommodationById);

// Delete Accommodation BY ID
router
  .route("/:id")
  .delete(auth.verifyToken, accommodationsController.deleteAccommodationById);

// Search Accommodation By ID
router.route("/search").get(accommodationsController.searchAccommodation);

module.exports = router;
