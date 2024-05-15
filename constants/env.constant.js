const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  SERVER: {
    PORT: process.env.PORT || 8080,
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
