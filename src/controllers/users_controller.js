const User = require("../models/user");

const signup = async (req, res) => {

  let newUser = new User({
    username: req.body.username
    });

    await newUser.save().catch(error => {
        console.log(error);
    });
    res.send(newUser);
}
    
module.exports = {signup}