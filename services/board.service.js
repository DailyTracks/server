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
  like: [
    [literal("like_count"), "DESC"],
    [literal("createdAt"), "DESC"], // createdAt을 추가합니다.
  ],
  view: [
    [literal("hit_count"), "DESC"],
    [literal("createdAt"), "DESC"], // createdAt을 추가합니다.
  ],
};
class BoardService {
  async getBoardUidByBid(bid) {
    const board = await boards.findOne({
      where: { id: bid },
    });
    return board.user_id;
  }
  async parseBoard(board) {
    const { content, ...rest } = board;
    const parsedContent = JSON.parse(content); // content 값을 JSON으로 파싱
    return {
      content: parsedContent, // 파싱된 content를 새로운 객체에 포함시킴
      ...rest,
    };
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

    const parsedBoards = await Promise.all(
      foundBoards.map(async (board) => {
        return await this.parseBoard(board.dataValues);
      })
    );
    return parsedBoards;
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
    const parsedBoard = await this.parseBoard(board.dataValues);
    return { ...parsedBoard, comments: comment };
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
      where: { region: region },
      order: searchMethod[type],
    });
    const parsedBoards = await Promise.all(
      foundBoards.map(async (board) => {
        return await this.parseBoard(board.dataValues);
      })
    );
    return parsedBoards;
  }
  async createBoard(board) {
    const newBoard = await boards.create(board);
    await board_hit.create({ bid: newBoard.id });
    return newBoard;
  }
  async updateBoard(id, board) {
    console.log("asd", board);
    const updatedBoard = await boards.update(board, { where: { id: id } });
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
