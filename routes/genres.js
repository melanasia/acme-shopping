const express = require("express");
const { Genre } = require("../db");
const app = express.Router();

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    res.send(await Genre.findAll());
  } catch (ex) {
    next(ex);
  }
});
