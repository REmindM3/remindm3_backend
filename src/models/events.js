const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  title: String,
  description: String,
  isActive: Boolean,
  isPrivate: Boolean,
  alertDate: Date,
  createdAtDate: Date,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'Username' }
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
