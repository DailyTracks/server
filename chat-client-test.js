// client.js
const readline = require("readline");
const io = require("socket.io-client");
const socket = io("http://localhost:8080");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

socket.on("connect", () => {
  console.log("Connected to server");

  // 채팅방 입장
  const roomId = 1;
  const id = 1;
  socket.emit("joinRoom", { roomId, id }); // 채팅방 ID 변경
});

socket.on("messages", (messages) => {
  console.log("Received messages:", messages);
});

socket.on("message", (message) => {
  console.log("Received message:", message);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

// 사용자 입력 받기
rl.on("line", (input) => {
  // 메시지 보내기
  socket.emit("sendMessage", {
    roomId: 1,
    writer: 1,
    message: input,
  });
});
