const express = require("express");
const eventsRouter = express.Router();
const {
  getEvents,
  getMyEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteAllEvents,
  deleteOneEvent
} = require("../controllers/event_controller");

eventsRouter.get("/", getEvents);

eventsRouter.get("/my-events", getMyEvents);

eventsRouter.get("/:id", getEventById);

eventsRouter.post("/", createEvent);

eventsRouter.put("/:id", updateEvent);

eventsRouter.delete("/clear", deleteAllEvents);

eventsRouter.delete("/:id", deleteOneEvent);

module.exports = eventsRouter;
