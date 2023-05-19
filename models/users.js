const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const getDb = require("../utils/database").getDb;

const userSchema = new Schema({
  user_id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  accommodations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accommodation",
    },
  ],
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  date_registered: {
    type: Date,
    default: Date.now,
  },
  profile_link: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
