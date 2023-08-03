const Event = require("../models/events")

const getEvents = (req, res) => {
    res.json({ message: "The list of events is here" });
  }

const createEvent = async(req, res) => {
    let newEvent = new Event({
        title: req.body.title,
        description: req.body.description, 
        isActive: true,
        isPrivate: true, 
        alertDate: new Date().toLocaleDateString(), 
        createdAtDate: Date.now(),
    })
    await newEvent.save()
    res.json({
        event: newEvent
    })
}
 
module.exports = {getEvents, createEvent}