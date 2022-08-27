const express = require("express");
const { Product, Category, Genre } = require("../db");
const app = express.Router();
const { isAdmin, isLoggedIn } = require("./middleware");

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    res.send(await Product.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.get("/:id", async (req, res, next) => {
  try {
    res.send(await Product.findByPk(req.params.id));
  } catch (ex) {
    next(ex);
  }
});

app.get("/genre/:id", async (req, res, next) => {
  try {
    res.send(await Product.findAll({ where: { genreId: req.params.id } }));
  } catch (ex) {
    next(ex);
  }
});

app.get("/category/:id", async (req, res, next) => {
  try {
    res.send(await Product.findAll({ where: { categoryId: req.params.id } }));
  } catch (ex) {
    next(ex);
  }
});

app.delete("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

app.put("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(await product.update(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.post("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await Product.create(req.body));
  } catch (ex) {
    next(ex);
  }
});
