// const express = require("express");
// const jwt = require("jsonwebtoken");
// const User = require("../src/models/User");

// const router = express.Router();

// router.post("/signup", async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const user = new User({ email, password });
//     await user.save();
//     const token = jwt.sign({ userId: user._id }, "SECRET_KEY");
//     res.send({ token });
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/login", async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !(await user.comparePassword(password))) {
//       throw new Error("Invalid email or password");
//     }
//     const token = jwt.sign({ userId: user._id }, "SECRET_KEY");
//     res.send({ token });
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/auth/google", (req, res) => {
//   // redirect the user to the Google login page
//   res.redirect("/google-login-url");
// });

// router.get("/auth/github", (req, res) => {
//   // redirect the user to the GitHub login page
//   res.redirect("/github-login-url");
// });

// module.exports = router;
