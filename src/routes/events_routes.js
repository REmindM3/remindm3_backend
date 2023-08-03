const express = require("express");
const eventsRouter = express.Router();

eventsRouter.get("/", (req, res) => {
  res.json({ message: "The list of events is here" });
});

eventsRouter.post("/", (req, res) => {
    res.json({
        "event":{
            "id": 1, 
            "title": "first event of the server", 
            "description": "make an event for the application",
            "isActive": Boolean,
            "isPrivate": Boolean,
            "alertDate": new Date().toLocaleDateString(), 
            "createdAtDate": new Date().toLocaleDateString(),
            "creator": "id"

        }
    })
})

module.exports = eventsRouter