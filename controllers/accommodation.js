const accommodation = require("../models/accommodation");
const Accommodation = require("../models/accommodation");
const User = require("../models/user");

exports.getAccommodations = (req, res, next) => {
  Accommodation.find()
    .then((accommodation) => {
      res.status(200).json({ success: true, accommodation });
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          success: false,
          message: "Something went wrong. Please try again later.",
        });
    });
};

exports.getAccommodationById = (req, res, next) => {
  const accommodationId = req.params.id;
  Accommodation.findById(accommodationId).then((accommodation) => {
    if(!accommodation) {
        return res.status(404).json({ success: false, message: 'Accommodation not found.'})
    }
    res.json(accommodation);
  }).catch((err) => {
    res.status(500).json({success: false, message: 'An Internal Error occurred.'})
  })
};

exports.createAccommodation = (req, res, next) => {};

exports.updateAccommodationById = (req, res, next) => {};

exports.deleteAccommodationById = (req, res, next) => {};
