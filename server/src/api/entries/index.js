const express = require("express");
const router = express.Router();

const { validateEntry, Entry } = require("./schema");
const { auth } = require("../../middleware/auth");

// Create
router.post("/", auth, async (req, res, next) => {
  try {
    await validateEntry(req.body);
    const entryData = getEntryData(req);
    const entry = new Entry(entryData);
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
router.patch("/:id", auth, async (req, res, next) => {
  try {
    await validateEntry(req.body);
    await checkOwnership(res, req);
    const entryData = getEntryData(req);
    const entry = await Entry.findByIdAndUpdate(req.params.id, entryData, {
      useFindAndModify: false,
      upsert: false,
    });
    res.json(entry);
  } catch (error) {
    next(error);
  }
});

// Destroy
router.delete("/:id", auth, async (req, res, next) => {
  try {
    await checkOwnership(res, req);
    const entry = await Entry.findByIdAndDelete(req.params.id);
    res.json(entry);
  } catch (error) {
    next(error);
  }
});

/**
 * Throws error if entry does not exist, or if entry is not owned by user with id in req.uid.
 */
const checkOwnership = async (res, req) => {
  const existingEntry = await Entry.findById(req.params.id);
  if (!existingEntry) {
    throw new Error("An entry with the given ID does not exist!");
  } else if (existingEntry.createdBy != req.uid.uid) {
    res.statusCode = 403;
    throw new Error("You do not own this entry!");
  }
};

const getEntryData = (req) => {
  return {
    word: req.body.word,
    emoji: req.body.emoji,
    absurdity: req.body.absurdity,
    description: req.body.description,
    createdBy: req.uid.uid,
  };
};

module.exports = router;
