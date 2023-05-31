// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const getDb = require("../utils/database").getDb;
// const Location = require('./location')

module.exports = (mongoose) => {
  const schema = mongoose.Schema({
    title: {
      type: String,
      //required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    location: {
      type: String,
      // required: true,
    },
    date: {
      type: Date,
      // required: true,
    },
    time: {
      type: String,
      // required: true,
    },
    type: {
      type: String,
      // required: true,
    },
    images: {
      type: [String],
      // required: true,
    },
    participants: {
      type: [String],
    },
  });
  const Event = mongoose.model("Event", schema);
  return Event;
};
