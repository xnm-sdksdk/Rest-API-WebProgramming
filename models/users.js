// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const getDb = require("../utils/database").getDb;
// const Accommodation = require("./accommodation");

module.exports = (mongoose) => {
  const schema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: Number, default: 1, required: false },
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
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
          },
        },
      ],
    },
    date_registered: {
      type: Date,
      default: Date.now,
    },
  });
  const User = mongoose.model("User", schema);
  return User;
};
