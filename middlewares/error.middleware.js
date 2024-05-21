module.exports = async (err, req, res, next) => {
  logger.error(err.message);
  res.status(400).json({
    message: err.message,
  });
  next();
};
