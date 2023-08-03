const mongoose = require('mongoose')

const Event = mongoose.model("Event", {
    title: String,
    description: String,
    isActive: Boolean,
    isPrivate: Boolean,
    alertDate: Date, 
    createdAtDate: Date,
    // creator: this.findById
});

// const Event = mongoose.model('Event', EventSchema)

module.exports = Event