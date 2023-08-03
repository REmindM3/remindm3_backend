const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Remindm3 backend",
  });
});

const eventsRouter = require("./routes/events_routes")
app.use("/events", eventsRouter);

module.exports = {
  app,
};
