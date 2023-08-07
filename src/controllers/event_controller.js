const mongoose = require("mongoose");
const Event = require("../models/events");
const { res } = require("express");
const User = require("../models/user");

const getEvents = async (req, res) => {
  // Build the query object
  const query = { isPrivate: false, isActive: true };

  // Find events using the query object
  const events = await Event.find(query);
  res.send(events);
};

const getMyEvents = async (req, res) => {
  let user = await User.findOne({ username: req.body.username }).populate(
    "events"
  );
  res.send(user.events);
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

const createEvent = async (req, res) => {
  // Check if isPrivate, title, and description are undefined
  if (req.body.isPrivate === undefined) {
    return res
      .status(400)
      .send("!Field_Required: You Must choose If The Event Private Or Public.");
  }
  if (req.body.title === undefined) {
    return res.status(400).send("!A Title Is Required.");
  }
  if (req.body.description === undefined) {
    return res.status(400).send("!A Description Is Required");
  }

  let user = await User.findOne({ username: req.body.username });

  let newEvent = new Event({
    title: req.body.title,
    description: req.body.description,
    isActive: req.body.isActive,
    isPrivate: req.body.isPrivate,
    alertDate: req.body.alertDate,
    createdAtDate: req.body.createdAtDate,
  });
  await newEvent.save();
  user.events.push(newEvent._id);
  await user.save();
  res.status(201).send;
  res.json(newEvent);
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
  let user = await User.findOne({ username: req.body.username });

  const event = await Event.findByIdAndDelete(req.params.id).catch((error) => {
    console.log("An Error Occurred While Accessing Data:\n" + error);
    res.status(404).send;
    res.json({
      error: "Id was not found in the database to delete",
    });
  });

  if (event) {
    //Remove the event_id from the users events array
    user.events.shift(event._id);
    res.json({
      message: "Event Deleted",
    });
  } else {
    res.json({
      error: "Id was not found in the database to delete",
    });
  }
};

// const deleteOneEvent = async (req, res) => {
//   let user = await User.findOne({ username: req.body.username });

//   event = await Event.findByIdAndDelete(req.params.id).catch((error) => {
//     console.log("An Error Occurred While Accessing Data:\n" + error);
//     res.status(404).send;
//     res.json({
//       error: "Id was not found in the database to delete",
//     });
//   });
//   //Remove the event_id from the users events array
//   user.events.shift(event._id);
//   res.json({
//     message: "Event Deleted",
//   });
// };

module.exports = {
  getEvents,
  getMyEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteAllEvents,
  deleteOneEvent,
};
