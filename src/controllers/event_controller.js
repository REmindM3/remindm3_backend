const mongoose = require("mongoose");
const Event = require("../models/events");
const { response } = require("express");

const getEvents = async (req, res) => {
  let events = await Event.find();
  res.send(events);
};

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

// async function getEventById(req, res) {
//   let event = await Event.findById(req.params.id).catch((error) => {
//     console.log("An Error Occurred While Accessing Data:\n" + error);
//     res.status(404).send;
//     res.json({
//       error: "Id was not found in the database",
//     });
//   });
//   res.send(event);
// }

// async function getEventByTitle(req, res) {
//   console.log(req.params);
//   if (!req.params.title) {
//     return res.status(400).send('Invalid event title');
//   }
//   let eventByTitle = await Event.findOne({ title: req.params.title });
//   if (!eventByTitle) {
//     return res.status(404).send('Event not found');
//   }
//   res.send(eventByTitle);
// }

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
  // getEventByTitle,
  createEvent,
  deleteAllEvents,
  deleteOneEvent,
};
