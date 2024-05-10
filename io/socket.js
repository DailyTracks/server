const socketIo = require("socket.io");
const { chatrooms, messages, users } = require("../models");
const { Op } = require("sequelize");

let io;
/** TODO: TRY-CATCH 로 안꺼지게 */
/** TODO: REDIS 로 MQ 구성 후 --> BATCH */
const init = (server) => {
  io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("joinRoom", async ({ id, roomId }) => {
      socket.join(roomId);
      const getMessages = await chatrooms.findAll({
        where: {
          [Op.or]: [{ user1_id: id }, { user2_id: id }],
          room_id: roomId,
        },
        include: [
          {
            model: users,
            as: "user1",
          },
          {
            model: users,
            as: "user2",
          },
          {
            model: messages,
            as: "messages",
          },
        ],
      });
      socket.emit("messages", getMessages);
    });

    socket.on("sendMessage", async ({ roomId, writer, message }) => {
      const newMessage = await messages.create({
        room_id: roomId,
        writer: writer,
        message: message,
        sent_time: new Date().toISOString(),
      });
      io.to(roomId).emit("message", newMessage);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

function getIo() {
  if (!io) {
    throw new Error("Socket.io is not initialized");
  }
  return io;
}

module.exports = {
  init,
  getIo,
};
