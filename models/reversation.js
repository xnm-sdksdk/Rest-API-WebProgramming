const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new mongoose.Schema({
  accommodation_id: {
    type: Number,
    required: true,
  },
  facilitator_id: {
    type: Number,
    required: true,
  },
  reservation_id: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Number,
    required: true,
  },
  check_in_date: {
    type: Date,
    required: true,
  },
  check_out_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  number_guests: {
    type: Number,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
  updated: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Reservation", reservationSchema);
