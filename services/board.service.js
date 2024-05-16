const { boards, comments, users } = require("../models/index");
class BoardService {
  async getBoards() {
    const foundBoards = await boards.findAll();
    return foundBoards;
  }
  async getBoardUidByBid(bid) {
    const board = await boards.findOne({
      where: { id: bid },
    });
    return board.user_id;
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
  async getBoardByLocation(region) {
    const board = await boards.findAll({ where: { region: region } });
    return board;
  }
  async createBoard(board) {
    const newBoard = await boards.create(board);
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
