const NaverStrategy = require("passport-naver-v2").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy;

module.exports = {
  kakao: new KakaoStrategy(
    {
      clientID: "0b145b1b256b7e857eadda16ec534691",
      callbackURL: "http://localhost:8080/api/auth/login/kakao/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const id = profile._json.id;
      const provider = profile.provider;
      const name = profile._json.kakao_account.name;
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
  ),

  naver: new NaverStrategy(
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
  ),
};
