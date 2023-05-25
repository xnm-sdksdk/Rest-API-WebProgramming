const Event = require("../models/event");
const User = require("../models/users");

// Get all Events
exports.getEvents = async (req, res, next) => {
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
      res.status(201).json({
        success: true,
        message: "Event created successfully." + result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    });
};

exports.updateEventById = async (req, res, next) => {
  const eventId = req.body.eventId;
  const updatedTitle = req.body.title;
  const updatedDescription = req.body.description;
  const updatedLocation = req.body.location;
  const updatedDate = req.body.date;
  const updatedTime = req.body.time;
  const updatedType = req.body.type;
  const updatedImages = req.body.images;

  Event.findById(eventId)
    .then((event) => {
      event.title = updatedTitle;
      event.description = updatedDescription;
      event.location = updatedLocation;
      event.date = updatedDate;
      event.time = updatedTime;
      event.type = updatedType;
      event.images = updatedImages;
      return event.save();
    })
    .then((result) => {
      res
        .status(202)
        .json({
          success: true,
          message: "Event updated successfully " + result,
        });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: err.message });
    });
};

// Delete Event by ID
exports.deleteEventById = async (req, res, next) => {
  const eventId = req.params.eventId;
  Event.findByIdAndRemove(eventId)
    .then(() => {
      res
        .status(202)
        .json({ success: true, message: "Event deleted successfully." });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};
