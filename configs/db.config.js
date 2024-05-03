const { DB } = require("../constants/env.constant");

module.exports = {
  username: DB.USER,
  password: DB.PASSWORD,
  database: DB.NAME,
  host: DB.HOST,
  dialect: DB.DIALECT,
  define: {
    timestamps: false,
  },
};
