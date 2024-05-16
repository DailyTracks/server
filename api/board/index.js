const boardController = require("../../controllers/board.controller");
const guardMiddleware = require("../../middlewares/guard.middleware");

const router = require("express").Router();

router.get("/", boardController.getBoards);
router.get("/:id", boardController.getBoard);
router.post("/", guardMiddleware, boardController.createBoard);
router.put("/:id", guardMiddleware, boardController.updateBoard);
router.delete("/:id", guardMiddleware, boardController.deleteBoard);

module.exports = router;
