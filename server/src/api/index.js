const express = require("express");
const entryRouter = require("./entries/index");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "welcome to the api :3",
  });
});

router.use("/entries", entryRouter);

module.exports = router;
