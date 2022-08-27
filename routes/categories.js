const express = require("express");
const { Category } = require("../db");
const app = express.Router();

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    res.send(await Category.findAll());
  } catch (ex) {
    next(ex);
  }
});
