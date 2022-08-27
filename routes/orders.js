const express = require("express");
require("dotenv").config();
const app = express.Router();
const { isLoggedIn } = require("./middleware");
const { Order, User, LineItem } = require("../db");
const stripe = require("stripe")(process.env.SECRET_KEY);

console.log(process.env.SECRET_KEY);

module.exports = app;

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.post("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.createOrderFromCart());
  } catch (ex) {
    next(ex);
  }
});

app.post("/processGuestOrder", async (req, res, next) => {
  try {
    const { billingInfo, cart } = req.body;
    const guestUser = await User.create({
      firstName: `guest${Math.random().toString().slice(2, 11)}`,
      lastName: `guest${Math.random().toString().slice(2, 11)}`,
      email: billingInfo.email,
      phone: "999-999-9999",
      userType: "user",
      password: `${Math.random().toString().slice(2, 11)}`,
    });

    const date = new Date();

    const guestOrder = await Order.create({
      userId: guestUser.id,
      isCart: false,
      orderDate: date.getTime(),
    });

    await Promise.all(
      cart.lineItems.map((lineItem) =>
        LineItem.create({
          quantity: lineItem.quantity,
          orderId: guestOrder.id,
          productId: lineItem.productId,
        })
      )
    );

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

app.put("/cart", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.addToCart(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.get("/cart", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.getCart());
  } catch (ex) {
    next(ex);
  }
});

app.get("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.getOrders());
  } catch (ex) {
    next(ex);
  }
});
