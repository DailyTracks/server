var DataTypes = require("sequelize").DataTypes;
var _boards = require("./boards");
var _comments = require("./comments");
var _follows = require("./follows");
var _users = require("./users");

function initModels(sequelize) {
  var boards = _boards(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var follows = _follows(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  comments.belongsTo(boards, { as: "board", foreignKey: "board_id"});
  boards.hasMany(comments, { as: "comments", foreignKey: "board_id"});
  boards.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(boards, { as: "boards", foreignKey: "user_id"});
  comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "user_id"});
  follows.belongsTo(users, { as: "follower", foreignKey: "follower_id"});
  users.hasMany(follows, { as: "follows", foreignKey: "follower_id"});
  follows.belongsTo(users, { as: "followee", foreignKey: "followee_id"});
  users.hasMany(follows, { as: "followee_follows", foreignKey: "followee_id"});

  return {
    boards,
    comments,
    follows,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
