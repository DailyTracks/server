const { boards } = require("../models/index");
class BoardService {
  async getBoards() {
    const boards = await boards.findAll();
    return boards;
  }
  async getBoardById(id) {
    const board = await boards.findOne({ where: { id } });
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
