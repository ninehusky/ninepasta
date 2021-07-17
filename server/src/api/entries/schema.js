const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const emojiRegex = new RegExp("^\\p{Emoji}$", "u");

const entryValidationObject = Joi.object({
  word: Joi.string().alphanum().min(1).required(),
  emoji: Joi.string().pattern(emojiRegex).required(),
  absurdity: Joi.string()
    .valid("concrete", "reasonable", "outlandish")
    .required(),
  description: Joi.string().min(5).required(),
});

const entrySchema = mongoose.Schema({
  word: String,
  emoji: String,
  absurdity: String,
  description: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const validateEntry = (entry) => {
  const result = entryValidationObject.validate(entry);
  if (result.error) {
    throw result.error;
  }
};

const Entry = mongoose.model("Entry", entrySchema);

module.exports = {
  validateEntry,
  Entry,
};
