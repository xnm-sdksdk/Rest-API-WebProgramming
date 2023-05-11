const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  accommodation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Accommodation",
    required: true,
  },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
