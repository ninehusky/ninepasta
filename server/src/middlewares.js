const { ValidationError } = require("@hapi/joi");

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  // maybe searching for 'exist'
  if (err instanceof ValidationError || err.message.includes("exist")) {
    res.statusCode = 400;
  }
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🐶" : err.stack,
  });
}

module.exports = {
  notFound,
  errorHandler,
};
