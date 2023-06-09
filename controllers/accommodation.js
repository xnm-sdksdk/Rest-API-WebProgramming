const User = require("../models/users");
const db = require("../models/index");
const Accommodation = db.accommodations;

exports.getAccommodations = async (req, res, next) => {
  try {
    Accommodation.find().then((accommodations) => {
      console.log(accommodations);
      res.status(200).json({ success: false, message: accommodations });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get accommodation by id

exports.getAccommodationById = async (req, res, next) => {
  try {
    let accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) {
      res
        .status(404)
        .json({ success: false, message: "Accommodation not found" });
    }

    res.status(200).json({ success: true, message: accommodation });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "An Internal Error occurred.",
    });
  }
};

// Create accommodation

exports.createAccommodation = async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      price,
      rating,
      number_beds,
      room_type,
      amenities,
    } = req.body;

    if (!title) {
      return res
        .status(404)
        .json({ success: false, message: "All fields are mandatory" });
    }

    const checkTitle = await Accommodation.findOne({ title });

    if (checkTitle) {
      return res.status(400).json({
        success: false,
        message:
          "The Accommodation with the given title is already being used.",
      });
    }

    if (req.loggedUser.role !== 1) {
      const accommodation = new Accommodation({
        title: title,
        description: description,
        location: location,
        price: price,
        rating: rating,
        number_beds: number_beds,
        room_type: room_type,
        amenities: amenities,
      });
      await accommodation.save();

      const response = {
        title: accommodation.title,
        description: accommodation.description,
        location: accommodation.location,
        price: accommodation.price,
        rating: accommodation.rating,
        number_beds: accommodation.number_beds,
        room_type: accommodation.room_type,
        amenities: accommodation.amenities,
      };
      res.status(201).json({
        success: true,
        message: "Accommodation created successfully.",
        accommodation: response,
      });
    } else {
      res.status(403).json({ success: false, message: "Permission denied." });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "An Internal Error occurred.",
    });
  }
};

// Updated Accommodation

exports.updateAccommodationById = async (req, res, next) => {
  const accommodationId = req.body.accommodationId;
  const updatedTitle = req.body.title;
  const updatedDescription = req.body.description;
  const updatedLocation = req.body.location;
  const updatedPrice = req.body.price;
  const updatedBeds = req.body.number_beds;
  const updatedRoom = req.body.room_type;
  const updatedAvailability = req.body.availability;
  const updatedImages = req.body.images;
  const updatedAmenities = req.body.amenities;

  Accommodation.findById(accommodationId)
    .then((accommodation) => {
      accommodation.title = updatedTitle;
      accommodation.description = updatedDescription;
      accommodation.location = updatedLocation;
      accommodation.price = updatedPrice;
      accommodation.number_beds = updatedBeds;
      accommodation.room_type = updatedRoom;
      accommodation.availability = updatedAvailability;
      accommodation.images = updatedImages;
      accommodation.amenities = updatedAmenities;
      return accommodation.save();
    })
    .then((result) => {
      console.log("Updated Product");
      res.status(202).json({
        success: true,
        message: "Accommodation updated successfully " + result,
      });
    });
};

exports.deleteAccommodationById = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const accommodation = await Accommodation.findByIdAndRemove(req.params.id);
    console.log(id);

    if (!accommodation) {
      return res
        .status(404)
        .json({ success: false, message: "Accommodation not found." });
    }

    res
      .status(202)
      .json({ success: true, message: "Accommodation deleted successfully." });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "An Internal Error occurred.",
    });
  }
};
