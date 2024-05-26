const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  SERVER: {
<<<<<<< HEAD
    PORT: process.env.SERVER_PORT || 8081,
=======
    PORT: process.env.SERVER_PORT || 8080,
>>>>>>> 06b8bb190a3d8a1ef9cf057626b11b585c7449e1
  },
  DB: {
    DIALECT: process.env.DB_DIALECT,
    PORT: process.env.DB_PORT,
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    NAME: process.env.DB_NAME,
  },
  STRATEGY: {
    KAKAO: {
      CLIENT_ID: process.env.STRATEGY_KAKAO_CLIENT_ID,
      CALLBACK_URL: process.env.STRATEGY_KAKAO_CALLBACK_URL,
    },
    NAVER: {
      CLIENT_ID: process.env.STRATEGY_NAVER_CLIENT_ID,
      CLIENT_SECRET: process.env.STRATEGY_NAVER_CLIENT_SECRET,
      CALLBACK_URL: process.env.STRATEGY_NAVER_CALLBACK_URL,
    },
  },
};
