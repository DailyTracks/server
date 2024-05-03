const SequelizeAuto = require("sequelize-auto");
const { DB } = require("./constants/env.constant");

const auto = new SequelizeAuto(DB.NAME, DB.USER, DB.PASSWORD, {
  host: DB.HOST,
  dialect: DB.DIALECT,
  port: DB.PORT,
});
/**
 * TODO: v4.0.0 이상에서는 dialect 명서지거 지정 필요
 */
auto.run((err) => {
  if (err) throw err;
});
