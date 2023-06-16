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

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title field is mandatory" });
    }

    const existTitle = await Event.findOne({ title });

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
    // if (req.loggedUser.role !== 1) {
    // }
    const eventId = req.params.id;
    const { title, description, location, date, time, type } = req.body;
    console.log(req.params.id);

    const event = await Event.findByIdAndUpdate(
      eventId,
      {
        title,
        description,
        location,
        date,
        time,
        type,
      },
      { new: true }
    );

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found." });
    }

    res.status(200).json({ success: true, message: event });
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
    // if (req.loggedUser.role !== 1) {
    // }
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
    const userId = req.params.userId;
    const eventId = req.params.id;
    console.log("User ID: " + userId);
    console.log("Event ID: " + eventId);

    const user = await User.findById(userId);
    console.log("User: " + user);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found." });
    }

    if (event.participants.includes(user.name)) {
      return res.status(400).json({
        success: false,
        message: "User is already attending the event.",
      });
    }

    event.participants.push(user.name);
    user.events.items.push({ eventId });
    await event.save();
    await user.save();

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
