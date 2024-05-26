const { comments } = require("../models");

class CommentService {
  async getCommentUidByCid(cid) {
    try {
      const _comments = await comments.findAll({

        where: {
          id: cid,
        },
      });
      return _comments[0].dataValues.user_id;
    } catch (err) {
      throw err;
    }
  }
  async getComments(boardId) {
    try {
      const _comments = await comments.findAll({
        where: {
          board_id: boardId,
        },
      });
      return _comments;
    } catch (err) {
      throw err;
    }
  }
  async createComment(comment) {
    try {
      const _comment = await comments.create(comment);
      return _comment;
    } catch (err) {
      throw err;
    }
  }

  async updateComment(id,comment) {
    try {
	    console.log(comment)
      const _comment = await comments.update(comment,{where:{id}});
      return _comment;
    } catch (err) {
      throw err;
    }
  }
  async deleteComment(id) {
    try {
      const _comment = await comments.destroy({ where: { id } });
      return _comment;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = new CommentService();
