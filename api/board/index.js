const multer = require("multer");
const storage = require("../../configs/multer.config");
const boardController = require("../../controllers/board.controller");
const guardMiddleware = require("../../middlewares/guard.middleware");
const geoParseMiddleware = require("../../middlewares/geo-parse.middleware");

const router = require("express").Router();

const upload = multer({ storage: storage });
router.get("/", boardController.getBoards);
router.get("/:id", boardController.getBoard);
router.get("/geo-status", boardController.getGeoStatus);
router.post("/:id/like", guardMiddleware, boardController.likeBoard);
router.delete("/:id/like", guardMiddleware, boardController.likeBoard);
router.post(
  "/",
  guardMiddleware,
  upload.array("images", 5),
  geoParseMiddleware,
  boardController.createBoard
);
router.put("/:id", guardMiddleware, boardController.updateBoard);
router.delete("/:id", guardMiddleware, boardController.deleteBoard);

module.exports = router;
