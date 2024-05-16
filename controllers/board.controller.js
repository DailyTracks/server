const boardService = require("../services/board.service");

class BoardController {
  async getBoards(req, res, next) {
    try {
      const { region } = req.query;
      let boards = null;
      if (region) boards = await boardService.getBoardByLocation(region);
      else boards = await boardService.getBoards();

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
      const board = await boardService.createBoard({
        ...req.body,
        user_id: req.user.id,
      });
      res.status(201).json(board);
    } catch (err) {
      next(err);
    }
  }
  async updateBoard(req, res, next) {
    try {
      const id = req.params.id;
      if ((await boardService.getBoardById(id)) !== req.user.id)
        throw new Error("permission denied");
      const board = await boardService.updateBoard(id, {
        ...req.body,
        user_id: req.user.id,
      });
      res.status(200).json(board);
    } catch (err) {
      next(err);
    }
  }
  async deleteBoard(req, res, next) {
    try {
      const id = req.params.id;
      if ((await boardService.getBoardById(id)) !== req.user.id)
        throw new Error("permission denied");
      const board = await boardService.deleteBoard(id);
      res.status(200).json(board);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new BoardController();
