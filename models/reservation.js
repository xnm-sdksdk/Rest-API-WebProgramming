// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const getDb = require("../utils/database").getDb;
// const Accommodation = require('./accommodation');

module.exports = (mongoose) => {
  const schema = mongoose.Schema({
    accommodation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accommodation",
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
      type: Boolean,
      required: true,
    },
    number_guests: {
      type: Number,
      required: true,
    },
  });
  const Reservation = mongoose.model("Reservation", schema);
  return Reservation;
};
