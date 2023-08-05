const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  title: String,
  description: String,
  isActive: Boolean,
  isPrivate: Boolean,
  alertDate: Date,
  createdAtDate: Date,
  // creator: this.findById
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
