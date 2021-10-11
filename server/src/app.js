const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");

require("dotenv").config();

const middlewares = require("./middleware/middlewares");
const api = require("./api");
const userEndpoint = require("./users");

const app = express();

app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === "development"
        ? "localhost:3141"
        : "http://ninepasta.me",
  })
);

const RedisStore = require("connect-redis")(session);

const redisClient = redis.createClient(process.env.REDIS_URL);

redisClient.on("error", (err) => {
  console.log(`Error: ${err}`);
});

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  session({
    name: "qid",
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.ACCESS_TOKEN_SECRET,
    cookie: {
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: false,
    },
  })
);

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
