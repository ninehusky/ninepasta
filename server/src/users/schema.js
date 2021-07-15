const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const userValidationObject = Joi.object({
  username: Joi.string().alphanum().min(5).max(20).required(),
  password: Joi.string().min(8).max(100).required(),
});

const userSchema = mongoose.Schema({
  username: String,
  password: {
    type: String,
    select: false,
  },
});

const validateUser = (user) => {
  const result = userValidationObject.validate(user);
  if (result.error) {
    throw result.error;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = {
  validateUser,
  User,
};
