import { createRoot } from "react-dom/client";
import React from "react";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./store";
import { HashRouter as Router } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY);

const root = createRoot(document.querySelector("#root"));
root.render(
  <Provider store={store}>
    <Router>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Router>
  </Provider>
);
