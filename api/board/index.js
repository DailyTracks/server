const boardController = require("../../controllers/board.controller");

const router = require("express").Router();

router.get("/", boardController.getBoards);
router.get("/:id", boardController.getBoard);
router.post("/", boardController.createBoard);
router.put("/:id", boardController.updateBoard);
router.delete("/:id", boardController.deleteBoard);

module.exports = router;
