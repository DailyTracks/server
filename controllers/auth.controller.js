class AuthController {
  /** serializeUser */
  async deserializeUser(id, done) {
    try {
      // 세션에 저장된 사용자 ID를 사용하여 사용자를 찾아냅니다.
      const user = await users.findByPk(id);

      if (!user) throw new Error("User not found");
      logger.info(`user deserialized: ${user.email}`);
      return done(null, user);
    } catch (err) {
      logger.error("Error deserializing user");
      return done(err);
    }
  }
  serializeUser(user, done) {
    // 사용자의 고유한 식별자인 ID를 세션에 저장합니다.
    logger.info(`user serialized: ${user.email}`);
    done(null, user.id);
  }

  /** api controller */
  getAuthenticateUser(req, res, next) {
    if (req.user) {
      res.json({ isLogin: true, user: req.user });
    } else {
      res.json({ isLogin: false });
    }
  }
}

module.exports = new AuthController();
