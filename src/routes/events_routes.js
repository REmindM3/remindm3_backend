const express = require("express");
const eventsRouter = express.Router();
const {getEvents, createEvent} = require("../controllers/event_controller");


eventsRouter.get("/", getEvents);

eventsRouter.post("/", createEvent);

module.exports = eventsRouter