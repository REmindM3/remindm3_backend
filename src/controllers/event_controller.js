const mongoose = require("mongoose");
const Event = require("../models/events");
const { res } = require("express");



const getEvents = async (req, res) => {
  // Build the query object
  const query = {};
  if (req.query.isPrivate) {
    query.isPrivate = req.query.isPrivate === 'true';
  }
  if (req.query.isActive) {
    query.isActive = req.query.isActive === 'true';
  }

  // Find events using the query object
  const events = await Event.find(query);
  res.send(events);
}


// const getEvents = async (req, res) => {
//   console.log(req.query);
//   let events;
//   if (Object.keys(req.query).length > 0) {
//     if (req.query.isPrivate === "true")
//       events = await Event.find({ isPrivate: true });
//     else if (req.query.isPrivate === "false")
//       events = await Event.find({ isPrivate: false });
//     else if (req.query.isActive === "true")
//       events = await Event.find({ isActive: true });
//     else if (req.query.isActive === "false")
//       events = await Event.find({ isActive: false });
//     else {
//       events = await Event.find();
//     }
//     res.send(events);
//   } else {
//     events = await Event.find();
//     res.send(events);
//   }
// };

async function getEventById(req, res) {
  try {
    let event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({
        error: "Id was not found in the database",
      });
    } else {
      res.send(event);
    }
  } catch (error) {
    console.log("An Error Occurred While Accessing Data:\n" + error);
    res.status(500).json({
      error: "An error occurred while accessing data",
    });
  }
}

const createEvent = async (req, res) => {
  let newEvent = new Event({
    title: req.body.title,
    description: req.body.description,
    isActive: req.body.isActive,
    isPrivate: req.body.isPrivate,
    alertDate: new Date().toLocaleDateString(),
    createdAtDate: Date.now(),
  });
  await newEvent.save();
  res.status(201);
  res.json({
    event: newEvent,
  });
};

const updateEvent = async (req, res) => {
  let updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).catch((error) => {
    console.log("An Error Occurred When Trying To Update Event:\n" + error);
    res.status(400).send;
  });
  if (updatedEvent) {
    res.send(updatedEvent);
  } else {
    res.json({ error: "Id Not Found For Event" });
  }
};

const deleteAllEvents = async (req, res) => {
  await Event.deleteMany({});
  res.json({
    message: "All Events Deleted",
  });
};

const deleteOneEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id).catch((error) => {
    console.log("An Error Occurred While Accessing Data:\n" + error);
    res.status(404).send;
    res.json({
      error: "Id was not found in the database to delete",
    });
  });
  res.json({
    message: "Event Deleted",
  });
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteAllEvents,
  deleteOneEvent,
};
