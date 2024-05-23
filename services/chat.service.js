const { Op } = require("sequelize");
const { chatrooms, users, messages } = require("../models");

class ChatService {
  async getChatRoom(id) {
    try {
      const foundChatrooms = await chatrooms.findAll({
        where: {
          user1_id: id,
        },
        include: [
          {
            model: users,
            as: "user1",
            attributes: ["username"],
          },
          {
            model: users,
            as: "user2",
            attributes: ["username"],
          },
        ],
      });
      return foundChatrooms;
    } catch (err) {
      throw err;
    }
  }
  async getChatMessagesByRoomId(id, roomId) {
    try {
      const foundMessages = await chatrooms.findAll({
        where: {
          [Op.or]: [{ user1_id: id }, { user2_id: id }],
          room_id: roomId,
        },
        include: [
          {
            model: users,
            as: "user1",
            attributes: ["username"],
          },
          {
            model: users,
            as: "user2",
            attributes: ["username"],
          },
          {
            model: messages,
            as: "messages",
          },
        ],
      });
      return foundMessages;
    } catch (err) {
      throw err;
    }
  }

  async joinChatRoom(id, targetId) {
    try {
      console.log(id, targetId);
      const chatroom = await chatrooms.findOne({
        where: {
          [Op.or]: [
            { [Op.and]: [{ user1_id: id }, { user2_id: targetId }] },
            { [Op.and]: [{ user1_id: targetId }, { user2_id: id }] },
          ],
        },
      });
      if (chatroom) throw new Error("already exists chat room");
      const newChatroom = await chatrooms.bulkCreate([
        {
          user1_id: id,
          user2_id: targetId,
        },
        { user1_id: targetId, user2_id: id },
      ]);
      return newChatroom;
    } catch (err) {
      throw err;
    }
  }
}
//new ChatService().getChatRoom(3).then((e) => console.log(e));
module.exports = new ChatService();
