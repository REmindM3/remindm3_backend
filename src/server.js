const express = require("express");
const mongoose = require("mongoose");
const app = express();
const url = 'mongodb://127.0.0.1:27017';

app.use(express.json());

async function dbConnect() {
  try {
    // await mongoose.connect("mongodb://127.0.0.1:27017/REmind_m3_db");
    await mongoose.connect("mongodb+srv://13313:TTKp70e5DQwkkS36@cluster0.9gl1zri.mongodb.net/");
    console.log("Database Connected!");
  } catch (error) {
    console.log(`dbConnect failed, error:${JSON.stringify(error)}`);
  }
}

dbConnect();

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Remindm3 backend",
  });
});

const eventsRouter = require("./routes/events_routes");
app.use("/events", eventsRouter);

module.exports = {
  app,
};
