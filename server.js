const app = require("./app");
const logger = require("./configs/logger.config");
const { SERVER } = require("./constants/env.constant");
const http = require("http");
const { init } = require("./io/socket");

/** http create server */
const server = http.createServer(app);

server.listen(SERVER.PORT, () => {
  init(server);
  logger.info(`Server is running on port ${SERVER.PORT}`);
});
