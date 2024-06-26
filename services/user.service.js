const { users, follows, profiles } = require("../models/index");

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

  async followUser(followerId, followeeId) {
    const follow = await follows.create({
      follower_id: followerId,
      followee_id: followeeId,
    });
    return follow;
  }

  async unFollowUser(followerId, followeeId) {
    return await follows.destroy({
      where: { follower_id: followerId, followee_id: followeeId },
    });
  }

  async getFollower(userId) {
    const rootUserId = await this.findRoot(userId);
    const followers = await follows.findAll({
      where: { followee_id: rootUserId },

      include: {
        model: users,
        as: "follower",

        attributes: ["id", "username", "email"],
      },
    });
    return followers;
  }

  async getFollowing(userId) {
    const rootUserId = await this.findRoot(userId);
    const following = await follows.findAll({
      where: { follower_id: rootUserId },
      include: {
        model: users,
        as: "followee",
        attributes: ["id", "username", "email"],
      },
    });
    return following;
  }

  async findRoot(userId) {
    let rootUserId = userId;
    let follow = await follows.findOne({ where: { followee_id: rootUserId } });
    while (follow) {
      rootUserId = follow.follower_id;
      follow = await follows.findOne({ where: { followee_id: rootUserId } });
    }
    return rootUserId;
  }

  async isSameGroup(userId1, userId2) {
    return (await this.findRoot(userId1)) === (await this.findRoot(userId2));
  }

  async isFollow(userId1, userId2) {
    const follow = await follows.findOne({
      where: {
        followee_id: userId2,
        follower_id: userId1,
      },
    });

    return !!follow;
  }
}

module.exports = new UserService();
