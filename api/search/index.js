const router = require("express").Router();

/**
 * user 검색
 */
router.get("/", (req, res, next) => {
  const { keyword } = req.query;

  res.send(keyword);
});
module.exports = router;
