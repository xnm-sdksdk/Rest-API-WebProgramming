const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const getDb = require("../utils/database");

const accommodationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  number_beds: {
    type: Number,
    required: true,
  },
  room_type: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  amenities: {
    type: [String],
    required: true,
  },
  facilitatorId: {
    type: Schema.Types.ObjectId,
    ref: "Facilitator",
    required: true,
  },
});

module.exports = mongoose.model("Accommodation", accommodationSchema);
