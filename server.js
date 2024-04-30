const app = require("./app");
const logger = require("./configs/logger.config");
const { SERVER } = require("./constants/env.constant");

app.listen(SERVER.PORT, () => {
  logger.info(`Server is running on port ${SERVER.PORT}`);
});
