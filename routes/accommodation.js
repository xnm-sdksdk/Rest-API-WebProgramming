const express = require("express");

const router = express.Router();

const accommodationsController = require("../controllers/accommodation");

// Get ALL Accommodations
router.get("/", accommodationController.getAccommodations);

// Get Accommodation BY ID
router.get(
  "/accommodations/:id",
  accommodationsController.getAccommodationById
);

// POST Accommodation
router.post