const auth = (req, res, next) => {
  try {
    console.log(req.session);
    if (!req.session.userId) {
      res.statusCode = 401;
      throw new Error("You are not logged in!");
    }
    return next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  auth,
};
