// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const getDb = require("../utils/database");

module.exports = (mongoose) => {
  const schema = mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  });
  const Accommodation = mongoose.model("Accommodation", schema);
  return Accommodation;
};
