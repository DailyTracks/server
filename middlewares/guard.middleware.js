const authenticate = (user) => {
  if (user) {
    return true;
  } else {
    return false;
  }
};
module.exports = (req, res, next) => {
  try {
    if (!authenticate(req.user)) throw new Error("you cannot access this user");
    next();
  } catch (err) {
    next(err);
  }
};
