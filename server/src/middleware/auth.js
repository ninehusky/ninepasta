const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token || !token.split(" ")[1]) {
      res.statusCode = 401;
      throw new Error("Not logged in.");
    }
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = decoded;
    return next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  auth,
};
