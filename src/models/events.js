const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the events collection
const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isPrivate: {
    type: Boolean,
    required: true,
  },
  alertDate: {
    type: Date,
    default: Date.now(),
  },
  createdAtDate: {
    type: Date,
    default: Date.now(),
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Create a model for the events collection
const Event = mongoose.model("Event", eventSchema);

// Export the model
module.exports = Event;
