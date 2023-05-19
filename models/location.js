const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const getDb = require("../utils/database").getDb;

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postal_code: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Location", locationSchema);
