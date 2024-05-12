const chatController = require("../../controllers/chat.controller");

const router = require("express").Router();

/**로그인을 해야지 가능함 */
/**채팅 방 정보 api */
router.get("/", chatController.getChatRoom);
router.get("/:roomId/messages", chatController.getMessagesByRoomId);

/**채팅방 만들기 */
router.post("/:targetId", chatController.joinChatRoom);

module.exports = router;
