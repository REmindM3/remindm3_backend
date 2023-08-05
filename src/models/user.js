const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: {
    type: String,
    unique: true,
    required: true,
  },
  events: [{ type: mongoose.Types.ObjectId, ref: "Event" }],
});

// const User = mongoose.model('User', UserSchema)

module.exports = User;
