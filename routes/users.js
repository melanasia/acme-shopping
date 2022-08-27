const express = require("express");
const app = express.Router();
const { User } = require("../db");
const { isLoggedIn } = require("./middleware");

module.exports = app;

app.post("/", async (req, res, next) => {
  try {
    res.send(await User.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.get("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await User.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.put("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(await user.update(req.body));
  } catch (ex) {
    next(ex);
  }
});
