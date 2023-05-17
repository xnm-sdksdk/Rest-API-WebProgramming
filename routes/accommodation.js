const express = require("express");
const router = express.Router();
const accommodationsController = require("../controllers/accommodation");

// Get ALL Accommodations
router.get("/api/v1/accommodations", accommodationsController.getAccommodations);

// Get Accommodation BY ID
router.get(
  "/accommodations/:id",
  accommodationsController.getAccommodationById
);

// POST Accommodation
router.post("/api/v1/accommodations", accommodationsController.createAccommodation);

// PUT Accommodation BY ID
router.put(
  "/api/v1/accommodations/:id",
  accommodationsController.updateAccommodationById
);

// Delete Accommodation BY ID
router.delete(
  "/api/v1/accommodations/:id",
  accommodationsController.deleteAccommodationById
);

module.exports = router;
