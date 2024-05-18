const boardService = require("../services/board.service");

class BoardController {
  async getBoards(req, res, next) {
    try {
      const { region } = req.query;
      let boards = null;
      /**
       * recent
       * like
       * view
       */
      const type = req.query.type || "recent";

      if (region) boards = await boardService.getBoardByLocation(region, type);
      else boards = await boardService.getBoards(type);

      res.status(200).json(boards);
    } catch (err) {
      next(err);
    }
  }
  async getBoard(req, res, next) {
    try {
      const id = req.params.id;
      const board = await boardService.getBoardById(id);
      res.status(200).json(board);
    } catch (err) {
      next(err);
    }
  }
  async createBoard(req, res, next) {
    try {
      const board = await boardService.createBoard(req.body);
      res.status(201).json(board);
    } catch (err) {
      next(err);
    }
  }
  async updateBoard(req, res, next) {
    try {
      const id = req.params.id;
      const board = await boardService.updateBoard(id, req.body);
      res.status(200).json(board);
    } catch (err) {
      next(err);
    }
  }
  async deleteBoard(req, res, next) {
    try {
      const id = req.params.id;
      const board = await boardService.deleteBoard(id);
      res.status(200).json(board);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new BoardController();
