const chatService = require("../services/chat.service");

class ChatController {
  async getChatRoom(req, res, next) {
    try {
      const id = req.user.id;
      const chatrooms = await chatService.getChatRoom(id);
      res.status(200).json(chatrooms);
    } catch (err) {
      next(err);
    }
  }
  async getMessagesByRoomId(req, res, next) {
    try {
      const id = 1;
      const { roomId } = req.params;
      const messages = await chatService.getChatMessagesByRoomId(id, roomId);
      res.status(200).json(messages);
    } catch (err) {
      next(err);
    }
  }

  async joinChatRoom(req, res, next) {
    try {

      const id = req.user.id;
      const { targetId } = req.params;
      const messages = await chatService.joinChatRoom(id, parseInt(targetId));
      res.status(200).json(messages);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ChatController();
