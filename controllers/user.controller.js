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
      const user = await userService.getUser(req.params.userid);
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
      const user = await userService.updateUser(req.params.userid, req.body);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
  async deleteUser(req, res, next) {
    try {
      const user = await userService.deleteUser(req.params.userid);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new UserController();
