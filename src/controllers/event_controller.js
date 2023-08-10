const mongoose = require("mongoose");
const Event = require("../models/events");
const { res } = require("express");
const User = require("../models/user");

const getEvents = async (req, res) => {
  // Build the query object
  const query = { isPrivate: false, isActive: true };

  // Find events using the query object
  const events = await Event.find(query);
  res.json(events);
};

const getMyEvents = async (req, res) => {
  // Find the user with the specified username and handle any errors
  let user = await User.findOne({ username: req.body.username })
    .populate("events")
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "An error occurred while finding the user" });
    });

  // Check if the user is not null
  if (user) {
    // Build the query object to include both public and private events
    const query = { $or: [{ isPrivate: false }, { isPrivate: true }] };
    // Find events using the query object and the user's events array
    const events = await Event.find(query).where("_id").in(user.events);
    res.json(events);
  } else {
    // No user was found with the specified username
    res.status(404).json({ error: "User not found" });
  }
};

async function getEventById(req, res) {
  try {
    // Check if the id parameter is undefined
    if (req.params.id === undefined) {
      return res.status(400).json({
        error: "The id parameter is required",
      });
    }

    let event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({
        error: "Id was not found in the database",
      });
    } else {
      res.json(event);
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

  // Find the user with the specified username
  let user = await User.findOne({ username: req.body.username });

  // Create a new event and associate it with the user
  let newEvent = new Event({
    title: req.body.title,
    description: req.body.description,
    isActive: true,
    isPrivate: req.body.isPrivate,
    alertDate: req.body.alertDate,
    createdAtDate: req.body.createdAtDate,
    creator: user._id,
  });

  // Save the new event to the database
  await newEvent.save();

  // Add the new event to the user's events
  user.events.push(newEvent._id);

  // Save the updated user to the database
  await user.save();

  // Send a response with the new event data
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
    res.json(updatedEvent);
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
  try {
    // Get the id of the event to delete from the request params
    const eventId = req.params.id;

    // Find and delete the event with the specified id
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    // Check if an event was deleted
    if (!deletedEvent) {
      // No event was found with the specified id
      return res.status(404).json({ error: "Event not found" });
    }

    // Find the user who created the event
    const user = await User.findById(deletedEvent.creator);

    // Remove the event id from the user's events array
    user.events.pull(eventId);

    // Save the updated user to the database
    await user.save();

    // Send a response with the deleted event data
    res.json(deletedEvent);
  } catch (error) {
    // An error occurred while deleting the event
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the event" });
  }
};

module.exports = {
  getEvents,
  getMyEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteAllEvents,
  deleteOneEvent,
};
