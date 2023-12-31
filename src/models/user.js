const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  // email: {
  //   type: String,
  //   unique: true,
  //   // required: true,
  // },
  events: [{ type: mongoose.Types.ObjectId, ref: 'Event' }],
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
