const User = require("../models/user");

const signup = async (req, res) => {
  // Convert the username value to lowercase
  const username = req.body.username.toLowerCase();

  let newUser = new User({
    username
  });

  await newUser.save().catch(error => {
    console.log(error);
  });
  res.send(newUser);
}

module.exports = {signup}