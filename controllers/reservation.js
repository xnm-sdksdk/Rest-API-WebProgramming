//const User = require("../models/users");
const db = require("../models/index");
const Reservation = db.reservations;
const Accommodation = db.accommodations;
const User = db.users;

exports.createReservation = async (req, res, next) => {
  try {
    const { accommodationId, checkInDate, checkOutDate, numberGuests } =
      req.body;

    const accommodation = await Accommodation.findById(accommodationId);
    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: "Accommodation not found.",
      });
    }

    if (!checkInDate || !checkOutDate || !numberGuests) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory" });
    }

    const existReservation = await Reservation.findOne({
      accommodation: accommodationId,
      $or: [
        { check_in_date: { $gte: checkInDate, $lt: checkOutDate } },
        { check_out_date: { $gt: checkInDate, $lte: checkOutDate } },
      ],
    });

    if (existReservation) {
      return res.status(400).json({
        success: false,
        message: "Accommodation is already reserved for the given dates.",
      });
    }

    // if (req.loggedUser.role !== 1) {

    // }

    const reservation = new Reservation({
      accommodation: accommodationId,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      status: true,
      number_guests: numberGuests,
    });

    await reservation.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Accommodation reserved successfully.",
        reservation: reservation,
      });
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

    const reservation = await Reservation.findByIdAndUpdate(
      reservationId,
      {},
      { new: true }
    );

    if (!reservation) {
      return res
        .status(404)
        .json({ success: false, message: "Reservation not found." });
    }

    res.status(200).json({ success: false, message: reservation });
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
