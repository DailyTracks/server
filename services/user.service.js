const { users, follows, profiles } = require("../models/index");
class UnionFind {
  constructor(size) {
    this.parent = new Array(size).fill(-1);
  }

  find(x) {
    let root = x;
    while (this.parent[root] >= 0) {
      root = this.parent[root];
    }
    while (x !== root) {
      let next = this.parent[x];
      this.parent[x] = root;
      x = next;
    }
    return root;
  }

  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);
    if (rootX !== rootY) {
      this.parent[rootY] = rootX;
    }
  }
}

class UserService {
  constructor() {
    this.unionFind = new UnionFind(users.length);
  }

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
    this.unionFind.union(followerId, followeeId);
    return follow;
  }

  async unFollowUser(followerId, followeeId) {
    await follows.destroy({
      where: { follower_id: followerId, followee_id: followeeId },
    });
  }

  async getFollower(userId) {
    const rootUserId = this.unionFind.find(userId);
    const followers = await follows.findAll({
      where: { followee_id: rootUserId },
      include: {
        model: users,
        as: "follower",
        attributes: ["id", "username", "email"],
      },
    });
    return followers.map((follow) => follow.follower);
  }

  async getFollowing(userId) {
    const rootUserId = this.unionFind.find(userId);
    const following = await follows.findAll({
      where: { follower_id: rootUserId },
      include: {
        model: users,
        as: "followee",
        attributes: ["id", "username", "email"],
      },
    });
    return following.map((follow) => follow.followee);
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
