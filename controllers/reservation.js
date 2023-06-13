const User = require("../models/users");
const db = require("../models/index");
const Reservation = db.reservations;

exports.createReservation = (req, res, next) => {
  try {
    const {
      accommodation_title,
      check_in_date,
      check_out_date,
      number_guests,
    } = req.body;
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong. Please try again later.",
    });
  }
};

exports.getReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong. Please try again later.",
    });
  }
};

exports.getReservationById = async (req, res, next) => {
  try {
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong. Please try again later.",
    });
  }
};

exports.updateReservationById = async (req, res, next) => {
  try {
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong. Please try again later.",
    });
  }
};

exports.deleteReservationById = async (req, res, next) => {
  try {
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong. Please try again later.",
    });
  }
};
