const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const url = "mongodb://127.0.0.1:27017";

const PORT = process.env.PORT || 3007;
const HOST = process.env.HOST || "127.0.0.1";

const helmet = require("helmet");
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy()); //
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["self"],
    },
  })
); //

const cors = require("cors");
let corsOptions = {
  origin: ["https://localhost:3000"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function dbConnect() {
  try {
    await mongoose.connect(
      "mongodb+srv://13313:TTKp70e5DQwkkS36@cluster0.9gl1zri.mongodb.net/REmind_m3_db"
    );
    console.log("<=== Database Connected ===>");
  } catch (error) {
    console.log(`dbConnect failed, error:${JSON.stringify(error)}`);
  }
}

dbConnect();

app.get("/", (req, res) => {
  res.json({
    message: "Welcome To The REmind_M3 Backend",
  });
});

const eventsRouter = require("./routes/events_routes");
app.use("/events", eventsRouter);

const usersRouter = require("./routes/users_routes");
app.use("/users", usersRouter);

app.get("*", (req, res) => {
  res.status(404);
  res.json({
    message: "Oops, Route Not Found ... Hang In There, Baby!",
    path: req.path
  })
})

module.exports = {
  app,
  HOST,
  PORT,
};
