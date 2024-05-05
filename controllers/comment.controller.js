const CommentService = require("../services/comment.service");

class CommentController {
  async getComments(req, res, next) {
    try {
      const boardId = req.query.boardId;
      const comments = await CommentService.getComments(boardId);
      res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  }
  async createComment(req, res, next) {
    try {
      const comment = await CommentService.createComment(req.body);
      res.status(201).json(comment);
    } catch (err) {
      next(err);
    }
  }

  async updateComment(req, res, next) {
    try {
      const id = req.params.id;
      const comment = await CommentService.updateComment(id, req.body);
      res.status(200).json(comment);
    } catch (err) {
      next(err);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const id = req.params.id;
      const comment = await CommentService.deleteComment(id);
      res.status(200).json(comment);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new CommentController();
