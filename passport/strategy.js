const { where } = require("sequelize");
const { users, profiles } = require("../models");

const NaverStrategy = require("passport-naver-v2").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy;
const LocalStrategy = require("passport-local").Strategy;
/** 가입 시 비밀번호 bcryto */
module.exports = {
  local: new LocalStrategy(
    {
      usernameField: "userId",
      passwordField: "password",
    },
    async (userId, password, done) => {
	    console.log(userId);
	    console.log(password);
      const user = await users.findOne({ where: { email: userId } });
      if (!user) {
        return done({ msg: "존재하지 않는 계정입니다.", code: -1 }, null);
      }

      const profile = await profiles.findOne({ where: { id: user.id } });
	    console.log(profile);
      if (profile.password !== password) {
        return done({ msg: "비밀번호가 일치하지 않습니다.", code: -1 }, null);
      }
      return done(null, user);
    }
  ),
  kakao: new KakaoStrategy(
    {
      clientID: "0b145b1b256b7e857eadda16ec534691",
      callbackURL: "http://3.34.226.107:8080/api/auth/join/kakao/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const id = profile._json.id;
      const provider = profile.provider;
      const name = profile._json.kakao_account.name;
      const email = profile._json.kakao_account.email;
      const user = await users.findOne({
        where: { oauth_provider: provider, oauth_id: id },
      });
      if (user) {
        return done({ msg: "이미 가입을 한 계정입니다.", code: -1 }, null);
      }
      const newUser = await users.create({
        oauth_provider: provider,
        oauth_id: id,
        username: name,
        email: email,
      });
      return done(null, newUser);
    }
  ),

  naver: new NaverStrategy(
    {
      clientID: "YrRexsBUtY3GwezYfvpX",
      clientSecret: "OOpNaPgjXX",
      callbackURL: "http://3.34.226.107:8080/api/auth/join/naver/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const { provider, id, email, name } = profile;
      const user = await users.findOne({
        where: { oauth_provider: provider, oauth_id: id },
      });
      if (user) {
        return done({ msg: "이미 가입을 한 계정입니다.", code: -1 }, null);
      }
      const newUser = await users.create({
        oauth_provider: provider,
        oauth_id: id,
        username: name,
        email: email,
      });
      return done(null, newUser);
    }
  ),
};
