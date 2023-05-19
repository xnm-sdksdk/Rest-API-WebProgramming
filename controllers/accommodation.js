const Accommodation = require("../models/accommodation");
const User = require("../models/user");

const ACCOMMODATIONS_PER_PAGE = 6;

exports.getAccommodations = (req, res, next) => {
  const page = parseInt(req.query.page);
  const skip = (page - 1) * ACCOMMODATIONS_PER_PAGE;
  let totalAccommodations;

  Accommodation.find()
    .count()
    .then((numAccommodations) => {
      totalAccommodations = numAccommodations;
      return Accommodation.find().skip(skip).limit(ACCOMMODATIONS_PER_PAGE);
    })
    .then((accommodation) => {
      res.status(200).json({
        success: true,
        message: accommodation,
        total: totalAccommodations,
        hasNextPage: ACCOMMODATIONS_PER_PAGE * page < totalAccommodations,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalAccommodations / ACCOMMODATIONS_PER_PAGE)
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    });
};

exports.getAccommodationById = (req, res, next) => {
  const accommodationId = req.params.id;
  Accommodation.findById(accommodationId)
    .then((accommodation) => {
      if (!accommodation) {
        return res
          .status(404)
          .json({ success: false, message: "Accommodation not found." });
      }
      res.json(accommodation);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: "An Internal Error occurred." });
    });
};

exports.createAccommodation = (req, res, next) => {
  const title = req.body.title;
  const images = req.body.images;
  const description = req.body.description;
  const location = req.body.location;
  const price = req.body.price;
  const number_beds = req.body.number_beds;
  const room_type = req.body.room_type;
  const availability = req.body.availability;
  const amenities = req.body.amenities;
  const accommodation = new Accommodation({
    title: title,
    description: description,
    location: location,
    price: price,
    number_beds: number_beds,
    room_type: room_type,
    availability: availability,
    images: images,
    amenities: amenities,
    facilitatorId: req.facilitator,
  });
  accommodation
    .save()
    .then((result) => {
      console.log("Accommodation Created");
      res.status(201).json({ success: true, message: accommodation });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: "An Internal Error occurred." });
    });
};

exports.updateAccommodationById = (req, res, next) => {
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
      res.status(200).json({ success: true, message: accommodation });
    });
};

exports.deleteAccommodationById = (req, res, next) => {
  const accommodationId = req.body.accommodationId;
  Accommodation.findByIdAndRemove(accommodationId)
    .then(() => {
      console.log("Product removed.");
      res.status(200).json({ success: true, message: "Product removed" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: "An Internal Error occurred." });
    });
};
