const mongoose = require('mongoose')

const EventsSchema = mongoose.Schema({
    title: String,
    description: String,
    isActive: Boolean,
    isPrivate: Boolean,
    alertDate: Date, 
    createdAtDate: Date,
    creator: id
});

const Event = mongoose.model('Event', EventSchema)

module.exports = Event