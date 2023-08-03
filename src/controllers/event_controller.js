const getEvents = (req, res) => {
    res.json({ message: "The list of events is here" });
  }

const createEvent = (req, res) => {
    res.json({
        "event":{
            "id": 1, 
            "title": req.body.title, 
            "description": req.body.description,
            "isActive": false,
            "isPrivate": true,
            "alertDate": new Date().toLocaleDateString(), 
            "createdAtDate": new Date().toLocaleDateString(),
            "creator": "id"

        }
    })
}
 
module.exports = {getEvents, createEvent}