const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const Accommodation = mongoose.model("Accommodation", accommodationSchema);

module.exports = Accommodation;
