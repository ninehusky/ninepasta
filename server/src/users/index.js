const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const { validateUser, User } = require("./schema");

const { auth } = require("./middleware");

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
    if (!existingUser) {
      throw new Error("Incorrect username/password!");
    }
    const valid = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!valid) {
      res.statusCode = 403; // Unauthorized
      throw new Error("Incorrect username/password!");
    }
    const token = jwt.sign(
      {
        uid: existingUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.json({
      token: token,
    });
  } catch (error) {
    next(error);
  }
});

// Update
router.patch("/:id", auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("ID must be included!");
    }
    await validateUser(req.body);
    const existingUser = await User.findById(id);
    if (!existingUser) {
      throw new Error("A user with the given name does not exist!");
    } else if (existingUser._id != id) {
      console.log(existingUser.username, req.body.username);
      console.log(existingUser._id, id);
      throw new Error("You are not logged in as this user!");
    }

    // now check that the user isn't already taken
    const dupe = await User.findOne({
      username: req.body.username,
    });
    if (dupe) {
      throw new Error("A user with that username already exists!");
    }

    const saltRounds = 10;
    const hashedPass = bcrypt.hashSync(req.body.password, saltRounds);
    const userInfo = {
      username: req.body.username,
      password: hashedPass,
    };

    const user = await User.findByIdAndUpdate(existingUser._id, userInfo, {
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

// check that user isn't already in database
// hash password given object
const insertUser = () => {};

module.exports = router;
