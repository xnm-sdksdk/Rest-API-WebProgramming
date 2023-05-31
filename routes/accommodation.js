const express = require("express");
const router = express.Router();
const accommodationsController = require("../controllers/accommodation");

// Get ALL Accommodations
router.route("/").get(accommodationsController.getAccommodations);

// Get Accommodation BY ID
router
  .route("/:id")
  .get(accommodationsController.getAccommodationById);

// POST Accommodation
router
  .route("/")
  .post(accommodationsController.createAccommodation);

// PATCH Updating Accommodation BY ID
router
  .route("/:id")
  .patch(accommodationsController.updateAccommodationById);

// Delete Accommodation BY ID
router
  .route("/:id")
  .delete(accommodationsController.deleteAccommodationById);

module.exports = router;
