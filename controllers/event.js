const Event = require("../models/event");
const User = require("../models/users");

const EVENTS_PER_PAGE = 6;
/*
exports.getEvents = (req, res, next) => {
  const page = parseInt(req.query.page);
  const skip = (page - 1) * EVENTS_PER_PAGE;
  let totalEvents;

  Event.find()
  .count()
    .then((numEvents) => {
        totalEvents = numEvents
        return Event.find().skip(skip).limit(EVENTS_PER_PAGE);
    })
      if (numEvents.length === 0) {
        res
          .status(404)
          .json({ success: false, message: "No events were found." });
      } else {
        res
          .status(200)
          .json({ success: true, page: page, limit: limit, event: event });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    });
};
*/
exports.getEventById = async (req, res, next) => {
  try {
    let event = await Event.find({});
    res.status(200).json({ success: true, message: event });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
  }
};

exports.createEvent = (req, res, next) => {};

exports.updateEventById = (req, res, next) => {};

exports.deleteEventById = (req, res, next) => {};
