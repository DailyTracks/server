const { users } = require("../models/index");
class UserService {
  async getUsers() {
    return await users.findAll();
  }
  async getUser(id) {
    return await users.findOne({ where: { id } });
  }
  async createUser(user) {
    return await users.create(user);
  }

  async updateUser(id, user) {
    return await users.update(user, { where: { id } });
  }

  async deleteUser(id) {
    return await users.destroy({ where: { id } });
  }
}

module.exports = new UserService();
