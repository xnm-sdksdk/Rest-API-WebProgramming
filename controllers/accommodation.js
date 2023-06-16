const User = require("../models/users");
const db = require("../models/index");
const Accommodation = db.accommodations;

// Get all Accommodations

exports.getAccommodations = async (req, res, next) => {
  try {
    const accommodations = await Accommodation.find();

    res.status(200).json(accommodations);
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
      message: err.message || "Something went wrong. Please try again later.",
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

    if (
      !title ||
      !description ||
      !location ||
      !price ||
      !rating ||
      !number_beds ||
      !room_type ||
      !amenities
    ) {
      return res
        .status(400)
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

    if (req.loggedUser.role !== 1 && req.loggedUser.role !== 3) {
      const accommodation = new Accommodation({
        title: title,
        description: description,
        location: location,
        price: price,
        rating: rating,
        number_beds: number_beds,
        room_type: room_type,
        amenities: amenities,
        facilitatorId: req.loggedUser.id,
      });

      const savedAccommodation = await accommodation.save();

      const response = {
        title: accommodation.title,
        description: accommodation.description,
        location: accommodation.location,
        price: accommodation.price,
        rating: accommodation.rating,
        number_beds: accommodation.number_beds,
        room_type: accommodation.room_type,
        amenities: accommodation.amenities,
        facilitatorId: savedAccommodation.facilitatorId,
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
  try {
    const accommodationId = req.params.id;
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

    if (req.loggedUser.role !== 1 && req.loggedUser.role !== 3) {
      const accommodation = await Accommodation.findByIdAndUpdate(
        accommodationId,
        {
          title,
          description,
          location,
          price,
          rating,
          number_beds,
          room_type,
          amenities,
        },
        { new: true }
      );

      if (!accommodation) {
        return res
          .status(404)
          .json({ success: false, message: "Accommodations not found." });
      }

      res.status(200).json({ success: true, message: accommodation });
    } else {
      res.status(403).json({ success: false, message: "Permission denied." });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong. Please try again later",
    });
  }
};

exports.deleteAccommodationById = async (req, res, next) => {
  try {
    console.log(req.params.id);
    if (req.loggedUser.role !== 1 && req.loggedUser.role !== 3) {
      if (!accommodation) {
        console.log(accommodation);
        return res
          .status(404)
          .json({ success: false, message: "Accommodation not found." });
      }
      const accommodation = await Accommodation.findByIdAndRemove(
        req.params.id
      );

      if (accommodation.facilitatorId.toString() !== req.facilitatorId) {
        return res.status(403).json({
          success: false,
          message: "This accommodation does not belong to you.",
        });
      }

      res.status(202).json({
        success: true,
        message: "Accommodation deleted successfully.",
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

exports.searchAccommodation = async (req, res, next) => {
  try {
    const { title, location, price, rating, numberOfBeds } = req.query;

    const query = {};

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (price) {
      query.price = { $lte: parseFloat(price) };
    }

    if (rating) {
      query.rating = { $gte: parseFloat(rating) };
    }

    if (numberOfBeds) {
      query.numberOfBeds = parseInt(numberOfBeds);
    }

    const accommodations = await Accommodation.find(query);

    res.status(200).json(accommodations);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong. Please try again later.",
    });
  }
};
