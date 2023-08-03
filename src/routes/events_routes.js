const express = require("express");
const eventsRouter = express.Router();
const {getEvents, createEvent, deleteAllEvents} = require("../controllers/event_controller");


eventsRouter.get("/", getEvents);

eventsRouter.post("/", createEvent);

eventsRouter.delete("/clear", deleteAllEvents);

module.exports = eventsRouter