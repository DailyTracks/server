var DataTypes = require("sequelize").DataTypes;
var _boards = require("./boards");
var _chatrooms = require("./chatrooms");
var _comments = require("./comments");
var _follows = require("./follows");
var _messages = require("./messages");
var _profiles = require("./profiles");
var _users = require("./users");

function initModels(sequelize) {
  var boards = _boards(sequelize, DataTypes);
  var chatrooms = _chatrooms(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var follows = _follows(sequelize, DataTypes);
  var messages = _messages(sequelize, DataTypes);
  var profiles = _profiles(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  comments.belongsTo(boards, { as: "board", foreignKey: "board_id"});
  boards.hasMany(comments, { as: "comments", foreignKey: "board_id"});
  messages.belongsTo(chatrooms, { as: "room", foreignKey: "room_id"});
  chatrooms.hasMany(messages, { as: "messages", foreignKey: "room_id"});
  boards.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(boards, { as: "boards", foreignKey: "user_id"});
  chatrooms.belongsTo(users, { as: "user1", foreignKey: "user1_id"});
  users.hasMany(chatrooms, { as: "chatrooms", foreignKey: "user1_id"});
  chatrooms.belongsTo(users, { as: "user2", foreignKey: "user2_id"});
  users.hasMany(chatrooms, { as: "user2_chatrooms", foreignKey: "user2_id"});
  comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "user_id"});
  follows.belongsTo(users, { as: "follower", foreignKey: "follower_id"});
  users.hasMany(follows, { as: "follows", foreignKey: "follower_id"});
  follows.belongsTo(users, { as: "followee", foreignKey: "followee_id"});
  users.hasMany(follows, { as: "followee_follows", foreignKey: "followee_id"});
  messages.belongsTo(users, { as: "writer_user", foreignKey: "writer"});
  users.hasMany(messages, { as: "messages", foreignKey: "writer"});
  profiles.belongsTo(users, { as: "id_user", foreignKey: "id"});
  users.hasMany(profiles, { as: "profiles", foreignKey: "id"});

  return {
    boards,
    chatrooms,
    comments,
    follows,
    messages,
    profiles,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
