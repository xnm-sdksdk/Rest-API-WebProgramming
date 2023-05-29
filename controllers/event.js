// const Event = require("../models/event");
// const User = require("../models/users");
const db = require("../models/index");
const Event = db.events;
const config = require("../config/config");


// Get all Events
exports.getEvents = async (req, res, next) => {
  Event.findAll()
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

/*
!req.body.description &&
      !req.body.location &&
      !req.body.date &&
      !req.body.time &&
      !req.body.type &&
      !req.body.images
      */

exports.createEvent = async (req, res) => {
  try {
    if (!req.body && !req.body.title) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory" });
    }

    //  description, location, date, time, type
    const { title, description, location, date, time, type } = req.body;
    const images = [];
    // const participants = [];
    const event = new Event({
      title: title,
      description: description,
      location: location,
      date: date,
      time: time,
      type: type,
      images: [],
      participants: [],
    });
    console.log(event + "First Log");
    await event.save();
    console.log(event + "Second Log");
    const response = {
      title: event.title,
      description: event.description,
      location: event.location,
      date: event.date,
      time: event.time,
      type: event.type,
      images: event.images,
    };
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: "Something went wrong. Please try again later.",
    });
  }
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
      res.status(202).json({
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
