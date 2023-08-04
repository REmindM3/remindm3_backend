const express = require("express");
const eventsRouter = express.Router();
const {
  getEvents,
  getEventById,
//   getEventByTitle,
  createEvent,
  deleteAllEvents,
  deleteOneEvent
} = require("../controllers/event_controller");

eventsRouter.get("/", getEvents);

eventsRouter.get("/:id", getEventById);

// eventsRouter.get("/:title", getEventByTitle);

eventsRouter.post("/", createEvent);

eventsRouter.delete("/clear", deleteAllEvents);

eventsRouter.delete("/:id", deleteOneEvent);

module.exports = eventsRouter;
