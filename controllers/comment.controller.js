const commentService = require("../services/comment.service");

class CommentController {
  async getComments(req, res, next) {
    try {
      const boardId = req.query.boardId;
      console.log(boardId);
      const comments = await commentService.getComments(boardId);
      res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  }
  async createComment(req, res, next) {
    try {
      const comment = await commentService.createComment({
        ...req.body,
        user_id: req.user.id,
      });
      res.status(201).json(comment);
    } catch (err) {
      next(err);
    }
  }

  async updateComment(req, res, next) {
    try {
      const id = req.params.id;
      if ((await commentService.getCommentUidByCid(id)) !== req.user.id)
        throw new Error("permission denied");
      const comment = await commentService.updateComment(id, {
        ...req.body,
        user_id: req.user.id,
      });
      res.status(200).json(comment);
    } catch (err) {
      next(err);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const id = req.params.id;
      const comment = await commentService.deleteComment(id);
      res.status(200).json(comment);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new CommentController();
