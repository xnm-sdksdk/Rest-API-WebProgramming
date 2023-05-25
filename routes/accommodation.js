const express = require("express");
const router = express.Router();
const accommodationsController = require("../controllers/accommodation");

// Get ALL Accommodations
router.route("/accommodations").get(accommodationsController.getAccommodations);

// Get Accommodation BY ID
router
  .route("/accommodations/:id")
  .get(accommodationsController.getAccommodationById);

// POST Accommodation
router
  .route("/accommodations")
  .post(accommodationsController.createAccommodation);

// PATCH Updating Accommodation BY ID
router
  .route("/accommodations/:id")
  .patch(accommodationsController.updateAccommodationById);

// Delete Accommodation BY ID
router
  .route("/accommodations/:id")
  .delete(accommodationsController.deleteAccommodationById);

module.exports = router;
