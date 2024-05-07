const passport = require("passport");
const { users } = require("../../models");
const logger = require("../../configs/logger.config");

const router = require("express").Router();
const NaverStrategy = require("passport-naver-v2").Strategy;

passport.use(
  "naver",
  new NaverStrategy(
    {
      clientID: "YrRexsBUtY3GwezYfvpX",
      clientSecret: "OOpNaPgjXX",
      callbackURL: "http://localhost:8080/api/auth/login/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const { provider, id, email, name } = profile;
      const user = await users.findOne({
        where: { oauth_provider: provider, oauth_id: id },
      });
      if (user) {
        return done(null, user);
      }
      const newUser = await users.create({
        oauth_provider: provider,
        oauth_id: id,
        email: email,
        username: name,
      });
      console.log(newUser);
      return done(null, newUser);
    }
  )
);
passport.serializeUser((user, done) => {
  // 사용자의 고유한 식별자인 ID를 세션에 저장합니다.
  logger.info(`user serialized: ${user.email}`);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
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
});

router.get("/login", passport.authenticate("naver", { authType: "reprompt" }));
router.get(
  "/login/callback",
  passport.authenticate("naver", { failureRedirect: "/" }),
  (req, res) => {
    // 로그인 성공 후 리다이렉트할 페이지로 React 클라이언트 주소를 전달합니다.
    res.redirect(`http://localhost:3000`);
  }
);
module.exports = router;
