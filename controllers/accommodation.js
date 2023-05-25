const Accommodation = require("../models/accommodation");
const User = require("../models/users");

exports.getAccommodations = async (req, res, next) => {};

exports.getAccommodationById = async (req, res, next) => {
  const accommodationId = req.params.id;
  Accommodation.findById(accommodationId)
    .then((accommodation) => {
      if (!accommodation) {
        return res
          .status(404)
          .json({ success: false, message: "Accommodation not found." });
      }
      // then to add
      res.status.json({});
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: "An Internal Error occurred." });
    });
};

exports.createAccommodation = async (req, res, next) => {
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
      res.status(201).json({
        success: true,
        message: "Accommodation created successfully " + result,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: "An Internal Error occurred." + err });
    });
};

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
  const accommodationId = req.body.accommodationId;
  Accommodation.findByIdAndRemove(accommodationId)
    .then(() => {
      res.status(202).json({ success: true, message: "Product removed" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: "An Internal Error occurred." });
    });
};
