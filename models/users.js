const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const getDb = require("../utils/database").getDb;
const Accommodation = require("./accommodation");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
  resetToken: String,
  resetTokenExpiration: Date,
  accommodations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accommodation",
    },
  ],
  events: {
    items: [
      {
        eventId: {
          type: Schema.Types.ObjectId,
          ref: "Event",
          required: true,
        },
      },
    ],
  },
  date_registered: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
