const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  SERVER: {
    PORT: process.env.PORT || 8080,
  },
};
