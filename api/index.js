const router = require("express").Router();
const user = require("./user/index");
// const follow = require("./follow/index");
const auth = require("./auth/index");
const board = require("./board/index");
// const search = require("./search/index");
const comment = require("./comment/index");
const chat = require("./chat/index");
router.use("/user", user);
router.use("/auth", auth);
router.use("/board", board);
router.use("/comment", comment);
router.use("/chat", chat);
router.get("/test", (req, res, next) => {
  res.json(req.user);
});

// router.use("/search", search);
module.exports = router;
