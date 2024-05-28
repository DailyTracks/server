const chatController = require("../../controllers/chat.controller");
const guardMiddleware = require("../../middlewares/guard.middleware");

const router = require("express").Router();

/**로그인을 해야지 가능함 */
/**채팅 방 정보 api */
router.get("/", guardMiddleware, chatController.getChatRoom);
router.get("/:roomId/messages", chatController.getMessagesByRoomId);

/**채팅방 만들기 */
router.post("/:targetId", guardMiddleware,chatController.joinChatRoom);

module.exports = router;
