const db = require("../models/index");
const Event = db.events;
const config = require("../config/config");

// Get all Events
exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong. Please try again later.",
    });
  }
};

// Get by ID
exports.getEventById = async (req, res, next) => {
  try {
    let event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ success: false, message: "Event not found." });
    }

    res.status(200).json({ success: true, message: event });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, description, location, date, time, type } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title field is mandatory" });
    }

    const existTitle = await Event.findOne({ title });
    
    if(existTitle) {
      return res.status(400).json({ success: false, message: "The Event with the given title is already being used." })
    }

    if (req.loggedUser.role !== 1) {
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
      res.status(201).json({ success: true, message: "Event created successfully!", event: response});
    } else {
      res.status(403).json({ success: false, message: "Permission denied." });
    }
  } catch (err) {
    res.status(500).json({
      err: "Something went wrong. Please try again later.",
    });
  }
};

//!
exports.updateEventById = async (req, res, next) => {
  const eventId = req.params.id;
  const updatedTitle = req.body.title;
  const updatedDescription = req.body.description;
  const updatedLocation = req.body.location;
  const updatedDate = req.body.date;
  const updatedTime = req.body.time;
  const updatedType = req.body.type;
  const updatedImages = req.body.images;

  console.log(req.params.id);
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
  try {
    console.log(req.params.id);
    const event = await Event.findByIdAndRemove(req.params.id);
    if (!event) {
      console.log(event);
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    res.status(202).json({
      success: true,
      message: "Event deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
