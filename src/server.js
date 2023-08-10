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
  origin: ["https://localhost:3007"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let databaseURL = "";
switch (process.env.NODE_ENV.toLowerCase()) {
  case "production":
    databaseURL = process.env.DATABASE_URL;
    break;
  case "development":
    databaseURL =
      "mongodb://127.0.0.1:27017/REmind_m3_db";
    break;
  case "test":
    databaseURL =
      "mongodb://127.0.0.1:27017/REmind_m3_db_test";
  default:
    console.error("Error - Wrong Environment Mode, Database Cannot Connect");
}

const { databaseConnector } = require("./database");
databaseConnector(databaseURL)
  .then(() => {
    console.log("<=== Database Connected ===>");
  })
  .catch((error) => {
    console.log(`dbConnect failed, error:${JSON.stringify(error)}`);
  });

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
    path: req.path,
  });
});

module.exports = {
  app,
  HOST,
  PORT,
};
