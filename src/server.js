const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Defining the PORT and HOST constants using environment variables or default values
const PORT = process.env.PORT || 3007;
const HOST = process.env.HOST || "127.0.0.1";

// Importing and using the helmet library for security
const helmet = require("helmet");
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["self"],
    },
  })
);

// Importing and using the cors library for cross-origin resource sharing
const cors = require("cors");
let corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Using express middleware to parse request bodies as JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Defining a variable to store the database URL
let databaseURL = "";
// Switch statement to set the database URL based on the NODE_ENV environment variable
switch (process.env.NODE_ENV.toLowerCase()) {
  case "production":
    databaseURL = process.env.DATABASE_URL;
    break;
  case "development":
    databaseURL =
      "mongodb+srv://13313:TTKp70e5DQwkkS36@cluster0.9gl1zri.mongodb.net/REmind_m3_db";
    break;
  case "test":
    databaseURL = "mongodb://127.0.0.1:27017/REmind_m3_db_test";
  default:
    console.error("Error - Wrong Environment Mode, Database Cannot Connect");
}

// Importing and calling the databaseConnector function to connect to the database
const { databaseConnector } = require("./database");
databaseConnector(databaseURL)
  .then(() => {
    console.log("<=== Database Connected ===>");
  })
  .catch((error) => {
    console.log(`dbConnect failed, error:${JSON.stringify(error)}`);
  });

// Route for checking the health of the database connection
app.get("/databaseHealth", (request, response) => {
  let databaseState = mongoose.connection.readyState;
  let databaseName = mongoose.connection.name;
  let databaseModels = mongoose.connection.modelNames();
  let databaseHost = mongoose.connection.host;

  response.json({
    readyState: databaseState,
    dbName: databaseName,
    dbModels: databaseModels,
    dbHost: databaseHost,
  });
});

// Route for the root path that returns a welcome message
app.get("/", (req, res) => {
  res.json({
    message: "Welcome To The REmind_M3 Backend",
  });
});

// Importing and using the eventsRouter for handling requests to /events path
const eventsRouter = require("./routes/events_routes");
app.use("/events", eventsRouter);

// Importing and using the usersRouter for handling requests to /users path
const usersRouter = require("./routes/users_routes");
app.use("/users", usersRouter);

// Route for handling requests to any other path that returns a not found message
app.get("*", (req, res) => {
  res.status(404);
  res.json({
    message: "Oops, Route Not Found ... Hang In There, Baby!",
    path: req.path,
  });
});

module.exports = {
  app,
  HOST,
  PORT,
};
