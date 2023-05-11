const express = require("express");
const router = express.Router();
const accommodationsController = require("../controllers/accommodation");

// Get ALL Accommodations
router.get("/", accommodationsController.getAccommodations);

// Get Accommodation BY ID
router.get(
  "/accommodations/:id",
  accommodationsController.getAccommodationById
);

// POST Accommodation
router.post("/accommodations", accommodationsController.createAccommodation);

// PUT Accommodation BY ID
router.put(
  "/accommodations/:id",
  accommodationsController.updateAccommodationById
);

// Delete Accommodation BY ID
router.delete(
  "/accommodations/:id",
  accommodationsController.deleteAccommodationById
);

module.exports = router;
