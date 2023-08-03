const Event = require("../models/events");

const getEvents = async (req, res) => {
  let events = await Event.find();
  res.send(events);
};

const createEvent = async (req, res) => {
  let newEvent = new Event({
    title: req.body.title,
    description: req.body.description,
    isActive: true,
    isPrivate: true,
    alertDate: new Date().toLocaleDateString(),
    createdAtDate: Date.now(),
  });
  await newEvent.save();
  res.status(201);
  res.json({
    event: newEvent,
  });
};

const deleteAllEvents = async (req, res) => {
  await Event.deleteMany({});
  res.json({
    message: "All Notes Deleted",
  });
};

module.exports = { getEvents, createEvent, deleteAllEvents };
