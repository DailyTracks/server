const express = require("express");
const app = express();
const cors = require("cors");
const apiIndex = require("./api/index");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");
const session = require("express-session");
const passport = require("passport");
app.use(cors());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", apiIndex);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
