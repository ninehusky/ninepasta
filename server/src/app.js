const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors"); // TODO: idk what this is
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const middlewares = require("./middleware/middlewares");
const api = require("./api");
const userEndpoint = require("./users");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.json({
    message: "bark! 🐶",
  });
});

app.use("/api/v1", api);
app.use("/users", userEndpoint);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
