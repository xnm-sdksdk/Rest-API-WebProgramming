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

// Get all Reservations

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

// Get Reservation by id

exports.getReservationById = async (req, res, next) => {
  try {
    let reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      re.status(404).json({
        success: false,
        message: "Reservation not found.",
      });
    }

    res.status(500).json({ success: true, message: reservation });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong. Please try again later.",
    });
  }
};

exports.updateReservationById = async (req, res, next) => {
  try {
    // if (req.loggedUser.role !== 1) {
    // }
    const reservationId = req.params.id;

    const {} = req.body;

    const reservation = await Reservation.findByIdAndUpdate(reservationId, {}, {new:true})

    if (!reservation) {
      return res
        .status(404)
        .json({ success: false, message: "Reservation not found." });
    }

    res.status(200).json({success:false, message: reservation})
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong. Please try again later.",
    });
  }
};

exports.deleteReservationById = async (req, res, next) => {
  try {
    // if (req.loggedUser.role !== 1) {
    // }
    const reservation = await Reservation.findByIdAndRemove(req.params.id);
    if (!reservation) {
      return res
        .status(404)
        .json({ success: false, message: "Reservation not found." });
    }

    res
      .status(202)
      .json({ success: true, message: "Reservation deleted successfully." });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong. Please try again later.",
    });
  }
};
