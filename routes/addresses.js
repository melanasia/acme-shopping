const express = require("express");
const { Address } = require("../db");
const app = express.Router();
const { isLoggedIn } = require("./middleware");

module.exports = app;

app.get("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(
      await Address.findAll({
        where: {
          userId: req.user.id,
        },
      })
    );
  } catch (ex) {
    next(ex);
  }
});

app.post("/", isLoggedIn, async (req, res, next) => {
  try {
    await req.user.addAddress(req.body);
    res.send(
      await Address.findAll({
        where: {
          userId: req.user.id,
        },
      })
    );
  } catch (ex) {
    next(ex);
  }
});

app.delete("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const address = await Address.findByPk(req.params.id);
    await address.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});
