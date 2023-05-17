const Accommodation = require("../models/accommodation");
const User = require("../models/user");

exports.getAccommodations = (req, res, next) => {
    Accommodation.find().then((accommodation) => {
        res.status(200).json({ success: true, accommodation})
    }).catch((err) => {
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.'})
    })
};

exports.getAccommodationById = (req, res, next) => {};

exports.createAccommodation = (req, res, next) => {};

exports.updateAccommodationById = (req, res, next) => {};

exports.deleteAccommodationById = (req, res, next) => {};
