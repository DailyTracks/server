const commentController = require("../../controllers/comment.controller");
const guardMiddleware = require("../../middlewares/guard.middleware");

const router = require("express").Router();

router.get("/", commentController.getComments);
router.post("/", guardMiddleware, commentController.createComment);
router.put("/:id", guardMiddleware, commentController.updateComment);
router.delete("/:id", guardMiddleware, commentController.deleteComment);

module.exports = router;
