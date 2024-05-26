const boardService = require("../services/board.service");
const geoInfo = [
  "충청북도",
  "강원도",
  "경기도",
  "경상남도",
  "경상북도",
  "광주광역시",
  "대구광역시",
  "대전광역시",
  "부산광역시",
  "서울특별시",
  "세종특별시",
  "울산광역시",
  "인천광역시",
  "전라남도",
  "전라북도",
  "제주특별자치도",
  "충청남도",
];
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
  async getGeoStatus(req, res, next) {
    try {
      const result = await boardService.getGeoStatus();
      console.log(result);
      res.status(200).json(result);
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
      const files = [];
      req.files.map((file) => {
        files.push(`/${file.destination}${file.filename}`);
      });
      const { content, ...rest } = req.body;
      const stringifyContent = JSON.stringify({
        images: files,
        content: content,
      });
      const board = await boardService.createBoard({
        ...{
          content: stringifyContent,
          ...rest,
        },
        user_id: req.user.id,
      });
      res.status(201).json(board);
    } catch (err) {
      next(err);
    }
  }
  async updateBoard(req, res, next) {
    try {
      const files = [];
      req.files.map((file) => {
        files.push(`/${file.destination}${file.filename}`);
      });
      const { content, ...rest } = req.body;
      const stringifyContent = JSON.stringify({
        images: files,
        content: content,
      });
      const id = req.params.id;
      if ((await boardService.getBoardUidByBid(id)) !== req.user.id)
        throw new Error("permission denied");
      const board = await boardService.updateBoard(id, {
        ...{
          content: stringifyContent,
          ...rest},
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
      if ((await boardService.getBoardUidByBid(id)) !== req.user.id)
        throw new Error("permission denied");
      const board = await boardService.deleteBoard(id);
      res.status(200).json(board);
    } catch (err) {
      next(err);
    }
  }
  async likeBoard(req, res, next) {
    try {
      const id = req.params.id;
      if ((await boardService.getBoardUidByBid(id)) !== req.user.id)
        throw new Error("permission denied");

      const board = await boardService.likeBoard(id, req.user.id, req.method);
      res.status(200).json(board);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new BoardController();
