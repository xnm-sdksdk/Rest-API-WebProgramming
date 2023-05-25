const Event = require("../models/event");
const User = require("../models/users");

// Get all Events
exports.getEvents = (req, res, next) => {
  Event.find()
    .then((events) => {
      res.status(200).json({ success: true, message: events });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    });
};

// Get by ID
exports.getEventById = async (req, res, next) => {
  try {
    let event = await Event.find({});
    res.status(200).json({ success: true, message: event });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

exports.createEvent = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const location = req.body.location;
  const date = req.body.date;
  const time = req.body.time;
  const type = req.body.type;
  const images = req.body.images;
  const event = new Event({
    title: title,
    description: description,
    location: location,
    date: date,
    time: time,
    type: type,
    images: images,
  });
  event
    .save()
    .then((result) => {
      res
        .status(201)
        .json({
          success: true,
          message: "Event created successfully." + result,
        });
    })
    .catch((error) => {
      res
        .status(500)
        .json({
          success: false,
          message: "Something went wrong. Please try again later.",
        });
    });
};

exports.updateEventById = (req, res, next) => {};

exports.deleteEventById = (req, res, next) => {};
