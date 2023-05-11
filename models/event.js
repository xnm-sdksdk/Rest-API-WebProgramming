const mongoose = require("mongoose");
const { events } = require("./users");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
