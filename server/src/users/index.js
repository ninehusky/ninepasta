const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const { validateUser, User } = require("./schema");

const { auth } = require("../middleware/auth");

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
      res.statusCode = 400;
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

    req.session.userId = inserted._id;
    await req.session.save();
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

router.get("/me", auth, async (req, res, next) => {
  if (req.session.userId) {
    const user = await User.findById(req.session.userId);
    res.json({
      name: user.username,
      id: user._id,
    });
  } else {
    res.json({
      name: undefined,
    });
  }
});

// Login
router.post("/login", async (req, res, next) => {
  try {
    await validateUser(req.body);
    const existingUser = await User.findOne({
      username: req.body.username,
    }).select("+password");
    if (!existingUser) {
      // res.statusCode = 403;
      throw new Error("Incorrect username/password!");
    }
    const valid = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!valid) {
      // res.statusCode = 403; // Unauthorized
      throw new Error("Incorrect username/password!");
    }

    req.session.userId = existingUser._id;
    await req.session.save();

    console.log("SAVED: ");
    console.log(req.session);

    existingUser.password = undefined;
    res.json(existingUser);
    // res.json("asdf");
  } catch (error) {
    return next(error);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    if (!req.session.userId) {
      res.statusCode = 400;
      throw new Error("You are not logged in!");
    }
    await req.session.destroy();
    await res.clearCookie("qid");
    res.json({ success: "success" });
  } catch (err) {
    next(err);
  }
});

// Update
router.patch("/:id", auth, async (req, res, next) => {
  try {
    await validateUser(req.body);
    await checkOwnership(req);

    // now check that the user isn't already taken
    const dupe = await User.findOne({
      username: req.body.username,
    });
    if (dupe._id != req.params.id) {
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
router.delete("/:id", auth, async (req, res, next) => {
  try {
    await checkOwnership(req);
    await User.findByIdAndDelete(req.params.id);
  } catch (err) {
    next(error);
  }
});

const checkOwnership = async (req) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new Error("A user with the given ID does not exist!");
  } else if (user._id != req.uid.uid) {
    throw new Error("You are not logged in as this user!");
  }
};

module.exports = router;
