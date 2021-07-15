const express = require("express");
const router = express.Router();

const { validateEntry, Entry } = require("./schema");

// Create
router.post("/", async (req, res, next) => {
  try {
    const existingEntry = await Entry.findOne({
      word: req.body.word,
      emoji: req.body.emoji,
    });
    if (existingEntry) {
      throw new Error(
        `An entry linking ${req.body.word} to ${req.body.emoji} already exists!`
      );
    }
    await validateEntry(req.body);
    const entry = new Entry(req.body);
    const inserted = await entry.save();
    res.json(inserted);
  } catch (error) {
    next(error);
  }
});

// Read
router.get("/", async (req, res, next) => {
  try {
    const items = await Entry.find({});
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// Update
router.patch("/", async (req, res, next) => {
  try {
    await validateEntry(req.body);
    const existingEntry = await Entry.findOne({
      word: req.body.word,
      emoji: req.body.emoji,
    });
    if (!existingEntry) {
      throw new Error(
        `A word mapping ${req.body.word} to ${req.body.emoji} does not exist!`
      );
    }
    const entry = await Entry.findByIdAndUpdate(existingEntry._id, req.body, {
      useFindAndModify: false,
      upsert: false,
    });
    res.json(entry);
  } catch (error) {
    next(error);
  }
});

// Destroy
router.delete("/", async (req, res, next) => {
  try {
    const existingEntry = await Entry.findOne({
      word: req.body.word,
      emoji: req.body.emoji,
    });
    if (!existingEntry) {
      throw new Error(
        `A word mapping ${req.body.word} to ${req.body.emoji} does not exist!`
      );
    }
    const deleted = await Entry.findByIdAndDelete(existingEntry._id);
    res.json(deleted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
