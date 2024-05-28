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
      const foundChatrooms_2 = await chatrooms.findAll({
        where: {
          user2_id: id,
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
	    const returnChatrooms = foundChatrooms.map(chatroom => {
  return chatroom;
});

foundChatrooms_2.forEach(chatroom => {
  const temp = chatroom.user1_id;
  chatroom.user1_id = chatroom.user2_id;
  chatroom.user2_id = temp;
   const temp2 = chatroom.user1.username;
  chatroom.user1.username = chatroom.user2.username;
chatroom.user2.username = temp2;

  returnChatrooms.push(chatroom);
});

return returnChatrooms;

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
		user1_id:id,
		user2_id:targetId
        },
      });
      if (chatroom) throw new Error("already exists chat room");
     await chatrooms.create(
        {
          user1_id: targetId,
          user2_id: id,
        },
      );
      return newChatroom;
    } catch (err) {
      throw err;
    }
  }
}
//new ChatService().getChatRoom(3).then((e) => console.log(e));
module.exports = new ChatService();
