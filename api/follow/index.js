const router = require("express").Router();
const user = require("./user/index");
const auth = require("./auth/index");
const post = require("./board/index");
const search = require("./search/index");
const comment = require("./comment/index");
router.use("/user", user);
router.use("/auth", auth);
router.use("/board", post);
router.use("/comment", comment);
router.use("/search", search);

module.exports = router;
