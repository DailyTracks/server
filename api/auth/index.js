const passport = require("passport");
const { users } = require("../../models");
const logger = require("../../configs/logger.config");
const { naver, kakao } = require("../../passport/strategy");

const router = require("express").Router();

passport.use("kakao", kakao);
passport.use("naver", naver);
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

router.get(
  "/login/naver",
  passport.authenticate("naver", { authType: "reprompt" })
);
router.get(
  "/login/naver/callback",
  passport.authenticate("naver", { failureRedirect: "/" }),
  (req, res) => {
    // 로그인 성공 후 리다이렉트할 페이지로 React 클라이언트 주소를 전달합니다.

    res.json({ redirectUrl: "http://localhost:3000", user: req.user });
  }
);

router.get(
  "/login/kakao",
  passport.authenticate("kakao", { authType: "reprompt" })
);
router.get(
  "/login/kakao/callback",
  passport.authenticate("kakao", { failureRedirect: "/" }),
  (req, res) => {
    // 로그인 성공 후 리다이렉트할 페이지로 React 클라이언트 주소를 전달합니다.

    res.json({ redirectUrl: "http://localhost:3000", user: req.user });
  }
);
module.exports = router;
