const { fn, col, literal, where, Sequelize } = require("sequelize");
const {
  boards,
  comments,
  users,
  board_hit,
  board_like,
} = require("../models/index");
const searchMethod = {
  recent: [[literal("createdAt"), "DESC"]],
  like: [[literal("like_count"), "DESC"]],
  view: [[literal("hit_count"), "DESC"]],
};
class BoardService {
  async getBoards(type) {
    const foundBoards = await boards.findAll({
      attributes: [
        "id",
        "title",
        "content",
        "region",
        "createdAt",
        "updatedAt",
        [literal("COUNT(DISTINCT board_likes.bid)"), "like_count"],
        [literal("SUM(hit_count)"), "hit_count"],
      ],
      include: [
        {
          model: board_like,
          as: "board_likes",
          attributes: [],
        },
        {
          model: board_hit,
          as: "board_hits",
          attributes: [],
        },
      ],
      group: ["boards.id"],
      order: searchMethod[type],
    });

    return foundBoards;
  }
  async getBoardById(id) {
    const board = await boards.findOne({
      where: { id },
      include: [
        {
          model: comments,
          as: "comments",
          attributes: ["id", "user_id", "content", "createdAt"],
          include: {
            model: users,
            as: "user",
            attributes: ["username"],
          },
        },
      ],
    });
    return board;
  }
  async getBoardByLocation(region, type) {
    console.log(region);
    const board = await boards.findAll({
      attributes: [
        "id",
        "title",
        "content",
        "region",
        "createdAt",
        "updatedAt",
        [literal("COUNT(DISTINCT board_likes.bid)"), "like_count"],
        [literal("SUM(hit_count)"), "hit_count"],
      ],
      include: [
        {
          model: board_like,
          as: "board_likes",
          attributes: [],
        },
        {
          model: board_hit,
          as: "board_hits",
          attributes: [],
        },
      ],
      group: ["boards.id"],
      where: { region: region },
      order: searchMethod[type],
    });
    return board;
  }
  async createBoard(board) {
    const newBoard = await boards.create(board);
    await board_hit.create({ bid: newBoard.id });
    return newBoard;
  }
  async updateBoard(id, board) {
    const updatedBoard = await boards.update(board, { where: { id } });
    return updatedBoard;
  }
  async deleteBoard(id) {
    const deletedBoard = await boards.destroy({ where: { id } });
    return deletedBoard;
  }
  async deleteAllBoards() {
    const deletedBoards = await boards.destroy({ where: {} });
    return deletedBoards;
  }
  async countBoards() {
    const countBoards = await boards.count();
    return countBoards;
  }
}

module.exports = new BoardService();
