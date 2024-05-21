const passport = require("passport");
const { users } = require("../../models");
const logger = require("../../configs/logger.config");
const { naver, kakao, local } = require("../../passport/strategy");

const router = require("express").Router();
/**
 * TODO: JOIN handling
 * 로그인했는데, 가입안되어있으면, 바로 가입 진행
 * 가입들어가면, naver 로그인 이후에 가입
 */
passport.use("local", local);
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
	console.log("dd",id);
    const user = await users.findByPk(id);

    if (!user) throw new Error("User not found");
    console.log(user);
    logger.info(`user deserialized: ${user.email}`);
    return done(null, user);
  } catch (err) {
    logger.error("Error deserializing user");
    return done(err);
  }
});
router.get("/", (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.json({ isLogin: true, user: req.user });
  } else {
    res.json({ isLogin: false });
  }
});
/** join 하기 */
router.get(
  "/join/naver",
  passport.authenticate("naver", { authType: "reprompt" })
);
router.get(
  "/join/naver/callback",
  passport.authenticate("naver", { failureRedirect: "/" }),
  (req, res) => {
	const {username,id, email, oauth_provider} = req.user;
    res.redirect(`http://localhost:3000/auth?mode=signup&id=${id}&email=${email}&provider=${oauth_provider}&username=${username}`);
  },
  (err, req, res, next) => {
    if (err) {
      res.send(
        '<script>alert("이미 가입된 계정입니다."); window.location.href = "http://localhost:3000/auth?mode=login";</script>'
      );
    }
  }
);

router.get(
  "/join/kakao",
  passport.authenticate("kakao", { authType: "reprompt" })
);
router.get(
  "/join/kakao/callback",
  passport.authenticate("kakao", { failureRedirect: "/" }),
  (req, res) => {
    // 로그인 성공 후 리다이렉트할 페이지로 React 클라이언트 주소를 전달합니다.
    res.redirect("http://localhost:3000");
  }
);
router.post(
  "/login",
  passport.authenticate("local"),
  (req, res) => {
    // 로그인이 성공하면 클라이언트에게 성공 메시지를 보냅니다.
    res.status(200).json({ message: "로그인 성공", user: req.user });
  },
  (err, req, res, next) => {
    if (err) {
      res.status(200).json({ message: "로그인 실패" });
    }
  }
);
module.exports = router;
