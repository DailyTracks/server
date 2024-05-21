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
  async getBoardUidByBid(bid) {
    const board = await boards.findOne({
      where: { id: bid },
    });
    return board.user_id;
  }
  async getBoards(type) {
    const foundBoards = await boards.findAll({
      attributes: [
        "id",
        "title",
        "content",
        "region",
        [col("user.username"), "author"],

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
        {
          model: users,
          as: "user",
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
      attributes: [
        "id",
        "title",
        "content",
        "region",
        [col("user.username"), "author"],
        [col("user.id"), "author_id"],
        "createdAt",
        "updatedAt",
        [literal("COUNT(DISTINCT board_likes.bid)"), "like_count"],
        [literal("SUM(hit_count)"), "hit_count"],
      ],
      where: { id },
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
        {
          model: users,
          as: "user",
          attributes: [],
        },
      ],

      group: ["boards.id"],
    });
    const comment = await comments.findAll({
      attributes: [
        "id",
        "content",
        "createdAt",
        "updatedAt",
        [col("user.username"), "author"],
      ],
      where: {
        board_id: id,
      },
      include: {
        model: users,
        as: "user",
        attributes: [],
      },
    });
    return { board, comments: comment };
  }
  async getGeoStatus() {
    const foundBoardStatus = await boards.findAll({
      attributes: ["region", [fn("COUNT", col("region")), "regionCount"]],
      group: ["region"],
      order: [[literal("regionCount"), "DESC"]],
    });
    return foundBoardStatus;
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
  async likeBoard(id, uid, type) {
    if (type == "POST" || type == "post")
      return await this.processLikeBoard(id, uid);
    else return await this.cancelLikeBoard(id, uid);
  }
  async processLikeBoard(id, uid) {
    return await board_like.create({ bid: id, uid: uid });
  }
  async cancelLikeBoard(id, uid) {
    return await board_like.destroy({
      where: { bid: id, uid: uid },
    });
  }
}

module.exports = new BoardService();
