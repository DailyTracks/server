const userService = require("../services/user.service");

class UserController {
  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  async getUser(req, res, next) {
    try {
      const user = await userService.getUser(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  async createUser(req, res, next) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const user = await userService.deleteUser(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  async followUser(req, res, next) {
    try {
      const userId = req.params.id;
      const targetUserId = req.body.targetUserId;
      await userService.followUser(userId, targetUserId);
      res.status(200).send("Successfully followed user.");
    } catch (err) {
      next(err);
    }
  }

  async unFollowUser(req, res, next) {
    try {
      const userId = req.params.id;
      const targetUserId = req.body.targetUserId;
      await userService.unFollowUser(userId, targetUserId);
      res.status(200).send("Successfully unfollowed user.");
    } catch (err) {
      next(err);
    }
  }

  async getFollower(req, res, next) {
    try {
      const userId = req.params.id;
      const followers = await userService.getFollower(userId);
      res.status(200).json(followers);
    } catch (err) {
      next(err);
    }
  }

  async getFollowing(req, res, next) {
    try {
      const userId = req.params.id;
      const following = await userService.getFollowing(userId);
      res.status(200).json(following);
    } catch (err) {
      next(err);
    }
  }

  async isSameGroup(req, res, next) {
    try {
      const userId1 = req.params.id;
      const userId2 = req.params.id2;
      const sameGroup = await userService.isSameGroup(userId1, userId2);
      res.status(200).json({ sameGroup });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
