const express = require("express");
const app = express();
const apiIndex = require("./api/index");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", apiIndex);

module.exports = app;
