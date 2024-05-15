const socketIo = require("socket.io");
const { messages } = require("../models");
const Queue = require("bull");

let io;
let messageQueue;

const init = (server) => {
  io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });
  messageQueue = new Queue("messages");

  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("joinRoom", async ({ roomId }) => {
      socket.join(roomId);
      try {
        const getMessages = await messages.findAll({
          where: { room_id: roomId },
        });
        socket.emit("messages", getMessages);
      } catch (error) {
        console.error("Error fetching messages: ", error);
      }
    });

    socket.on("sendMessage", async ({ roomId, writer, message }) => {
      try {
        // 메시지를 메시지 큐에 추가
        await messageQueue.add("sendMessage", { roomId, writer, message });

        // 실시간으로 전달
        io.to(roomId).emit("message", { writer, message });
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  // 메시지 큐 주기적으로 처리
  messageQueue.process("sendMessage", async (job) => {
    const { roomId, writer, message } = job.data;
    try {
      // 데이터베이스에 메시지 저장
      await messages.create({
        room_id: roomId,
        writer: writer,
        message: message,
      });
    } catch (error) {
      console.error("Error saving message to database: ", error);
    }
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
