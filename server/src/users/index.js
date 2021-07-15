const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const { validateUser, User } = require("./schema");

// Create
router.post("/", async (req, res, next) => {
  try {
    await validateUser(req.body);
    const saltRounds = 10;
    const hashedPass = bcrypt.hashSync(req.body.password, saltRounds);
    const existingUser = await User.findOne({
      username: req.body.username,
    });
    if (existingUser) {
      throw new Error(`A user with that name already exists!`);
    }
    const user = new User({
      username: req.body.username,
      password: hashedPass,
    });
    const inserted = await user.save();
    // please don't delete the line under this
    // thanks! - management
    inserted.password = undefined;
    res.json(inserted);
  } catch (error) {
    next(error);
  }
});

// Get
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Login
router.get("/login", async (req, res, next) => {
  try {
    await validateUser(req.body);
    const existingUser = await User.findOne({
      username: req.body.username,
    }).select("+password");
    const result = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Update
router.patch("/", async (req, res, next) => {
  try {
    await validateUser(req.body);
    const existingUser = await User.findOne({
      username: req.body.username,
    });
    if (!existingUser) {
      throw new Error("A user with the given name does not exist!");
    }
    const saltRounds = 10;
    const hashedPass = bcrypt.hashSync(req.body.password, saltRounds);
    const userInfo = {
      username: req.body.username,
      password: hashedPass,
    };
    const user = await User.findByIdAndUpdate(existingEntry._id, userInfo, {
      useFindAndModify: false,
      upsert: false,
    });
    // please dont delete this lol. really please dont
    user.password = undefined;
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Destroy

module.exports = router;
