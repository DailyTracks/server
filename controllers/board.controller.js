class BoardController {
  async getBoards(req, res, next) {
    try {
      const { region } = req.query;
      let boards = null;
      if (region) boards = await BoardService.getBoardByLocation(region);
      else boards = await BoardService.getBoards();

      res.status(200).json(boards);
    } catch (err) {
      next(err);
    }
  }
  async getBoard(req, res, next) {
    try {
      const id = req.params.id;
      const board = await BoardService.getBoard(id);
      res.status(200).json(board);
    } catch (err) {
      next(err);
    }
  }
  async createBoard(req, res, next) {
    try {
      const board = await BoardService.createBoard(req.body);
      res.status(201).json(board);
    } catch (err) {
      next(err);
    }
  }
  async updateBoard(req, res, next) {
    try {
      const id = req.params.id;
      const board = await BoardService.updateBoard(id, req.body);
      res.status(200).json(board);
    } catch (err) {
      next(err);
    }
  }
  async deleteBoard(req, res, next) {
    try {
      const id = req.params.id;
      const board = await BoardService.deleteBoard(id);
      res.status(200).json(board);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new BoardController();
