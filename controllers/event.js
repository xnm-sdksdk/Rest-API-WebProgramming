const db = require("../models/index");
const Event = db.events;
const config = require("../config/config");
const User = db.users;

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

// Create Event

exports.createEvent = async (req, res) => {
  try {
    const { title, description, location, date, time, type } = req.body;

    if (req.loggedUser.role !== 1) {
      const existTitle = await Event.findOne({ title });

      if (!title) {
        return res
          .status(400)
          .json({ success: false, message: "Title field is mandatory" });
      }

      if (existTitle) {
        return res.status(400).json({
          success: false,
          message: "The Event with the given title is already being used.",
        });
      }

      let eventDate = new Date(date);

      if (eventDate < Date.now()) {
        return res.status(400).json({
          success: false,
          message: "The Event with the given date is invalid.",
        });
      }

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

      await event.save();

      const response = {
        title: event.title,
        description: event.description,
        location: event.location,
        date: event.date,
        time: event.time,
        type: event.type,
        images: event.images,
      };
      res.status(201).json({
        success: true,
        message: "Event created successfully!",
        event: response,
      });
    } else {
      res.status(403).json({ success: false, message: "Permission denied." });
    }
  } catch (err) {
    res.status(500).json({
      err: "Something went wrong. Please try again later.",
    });
  }
};

// Update Event By ID

exports.updateEventById = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const { title, description, location, date, time, type } = req.body;

    const event = await Event.findByIdAndUpdate(eventId, { new: true });

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found." });
    }

    event.title = title;
    event.description = description;
    event.location = location;
    event.date = date;
    event.time = time;
    event.type = type;

    await event.save();

    res.status(200).json({
      success: true,
      message: event,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong. Please try again later",
    });
  }
};

// Delete Event by ID
exports.deleteEventById = async (req, res, next) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findByIdAndRemove(eventId, { new: true });

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
      message: err.message || "Something went wrong. Please try again later",
    });
  }
};

// Search By Event ID

exports.searchEvent = async (req, res, next) => {
  try {
    const { title, location, date } = req.query;

    console.log("Title:", title);
    console.log("Location:", location);
    console.log("Date:", date);
    const query = {};

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Event with the given title not found.",
      });
    }

    query.title = { $regex: title, $options: "i" }; // for case insensitive

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (date) {
      query.date = { $gte: new Date(date) }; // greater than or equal to
    }

    console.log(title);

    console.log("Query:", query);

    const events = await Event.find(query);

    res.status(200).json(events);
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Something went wrong. Please try again later",
    });
  }
};

// Post Attend Event

exports.attendEvent = async (req, res, next) => {
  try {
    const userId = await User.findById(req.params.id);
    const eventId = await Event.findById(req.params.id);
    console.log("User: " + userId);
    console.log("Event: " + eventId);

    if (!userId) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    if (!eventId) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found." });
    }

    if (eventId.participants.includes(userId.name)) {
      return res.status(400).json({
        success: false,
        message: "User is already attending the event.",
      });
    }

    eventId.participants.push(userId.name);
    userId.events.items.push({ eventId });
    await eventId.save();
    await userId.save();

    res.status(200).json({
      success: true,
      message: "User successfully attended the event.",
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Something went wrong. Please try again later",
    });
  }
};
