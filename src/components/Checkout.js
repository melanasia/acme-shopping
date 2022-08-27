import { useEffect, useState } from "react";
import React from "react";
import { connect } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import styled from "@emotion/styled";
import axios from "axios";
import "../Checkout.css";
import { processOrder } from "../store";

const Checkout = ({ cart, session, addresses, history, processOrder }) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [amount, setAmount] = useState(0);

  // session.auth.id ? `${session.auth.firstName} ${session.auth.lastName}` : ""

  useEffect(() => {
    //console.log(history);

    const primaryAddress =
      addresses.length > 0
        ? addresses.find((address) => address.isPrimary)
        : "";

    setName(
      session.auth.id
        ? `${session.auth.firstName} ${session.auth.lastName}`
        : ""
    );
    setEmail(session.auth.id ? session.auth.email : "");
    setAddress(
      primaryAddress ? `${primaryAddress.street} ${primaryAddress.apt}` : ""
    );
    setCity(primaryAddress ? primaryAddress.city : "");
    setState(primaryAddress ? primaryAddress.state : "");
    setZipCode(primaryAddress ? primaryAddress.zipcode : "");
    setSelectedAddress(primaryAddress ? primaryAddress.id : "custom");
    setAmount(
      cart.cartData.lineItems.length > 0
        ? cart.cartData.lineItems
            .reduce((accum, lineItem) => {
              return accum + lineItem.product.cost * lineItem.quantity;
            }, 0)
            .toFixed(2)
        : 0
    );
  }, [session, addresses, cart]);

  const stripe = useStripe();
  const elements = useElements();

  // const handleCardDetailsChange = (ev) => {
  //   ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  // };

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();

    const billingDetails = {
      name: name,
      email: email,
      address: {
        city: city,
        line1: address,
        state: state,
        postal_code: zipCode,
      },
    };

    // console.log(billingDetails);

    setProcessingTo(true);

    const cardElement = elements.getElement("card");

    try {
      const { data: clientSecret } = await axios.post(
        "/api/orders/create-payment-intent",
        {
          amount: amount * 100,
        }
      );

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails,
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      const { error } = await stripe.confirmCardPayment(
        clientSecret.clientSecret,
        {
          payment_method: paymentMethodReq.paymentMethod.id,
        }
      );

      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      }

      history.push("/successfulCheckout");
      processOrder({ cart: cart.cartData, billingInfo: billingDetails });
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  const selectAddress = (addressId) => {
    const address = addresses.find((address) => address.id === addressId);
    setAddress(address ? `${address.street} ${address.apt}` : "");
    setCity(address ? address.city : "");
    setState(address ? address.state : "");
    setZipCode(address ? address.zipcode : "");
    setSelectedAddress(address ? address.id : "custom");
  };

  const iframeStyles = {
    base: {
      color: "rgb(118, 118, 118)",
      fontSize: "18px",
      // iconColor: "#fff",
      // "::placeholder": {
      //   color: "#87bbfd",
      // },
    },
    invalid: {
      // iconColor: "#FFC7EE",
      // color: "#FFC7EE",
    },
    complete: {
      // iconColor: "#cbf4c9",
    },
  };

  const cardElementOptions = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true,
  };

  const primaryAddress =
    addresses.length > 0 ? addresses.find((address) => address.isPrimary) : "";

  const nonPrimaryAddresses =
    addresses.length > 0
      ? addresses.filter((address) => !address.isPrimary)
      : "";

  return (
    <div id="checkout">
      <div>
        <div className="cart">
          <h2>Items In Cart</h2>
          <div className="cartItems">
            <div key={"header"} className="lineItem">
              <h3>Item Name</h3>
              <h3>Qty</h3>
              <h3>Total Cost</h3>
            </div>
            {cart.cartData.lineItems.length ? (
              cart.cartData.lineItems
                .sort((a, b) => a.id - b.id)
                .map((lineItem) => {
                  return (
                    <div key={lineItem.productId} className="lineItem">
                      <div>
                        <h4>{lineItem.product.name}</h4>
                        <img src={lineItem.product.image} />
                      </div>

                      <p>{lineItem.quantity}</p>
                      <h4>{`$${(
                        lineItem.quantity * lineItem.product.cost
                      ).toFixed(2)}`}</h4>
                    </div>
                  );
                })
            ) : (
              <h3>Your Cart Is Empty</h3>
            )}
          </div>
          <div className="cartFooter">
            <h2>
              ORDER TOTAL: &nbsp;
              {cart.cartData.lineItems.length && `$${amount}`}
            </h2>
          </div>
        </div>
      </div>
      <div className="checkoutForm">
        <h2>Order Form</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="addressForm">
            <TextField
              required
              name="name"
              label="Name"
              size="small"
              value={name}
              onChange={(ev) => {
                setName(ev.target.value);
              }}
            />
            <TextField
              required
              name="email"
              label="Email"
              size="small"
              type="email"
              value={email}
              onChange={(ev) => {
                setEmail(ev.target.value);
              }}
            />
          </div>
          {addresses.length > 0 ? (
            <FormControl fullWidth>
              <InputLabel id="addressInputLabel">Address</InputLabel>
              <Select
                labelId="addressLabel"
                id="address"
                value={selectedAddress}
                label="Address"
                onChange={(ev) => {
                  selectAddress(ev.target.value);
                }}
              >
                {addresses.map((address) => {
                  return (
                    <MenuItem
                      key={address.id}
                      value={address.id}
                    >{`${address.street} ${address.apt} ${address.city} ${address.state} ${address.zipcode}`}</MenuItem>
                  );
                })}
                <MenuItem value={"custom"}>Custom</MenuItem>
              </Select>
            </FormControl>
          ) : null}
          <TextField
            className="addressForm"
            required
            name="address"
            label="Street Address"
            size="small"
            value={address}
            onChange={(ev) => {
              setAddress(ev.target.value);
            }}
          />
          <div className="addressForm">
            <TextField
              className="city"
              required
              name="city"
              label="City"
              size="small"
              value={city}
              onChange={(ev) => {
                setCity(ev.target.value);
              }}
            />
            <TextField
              className="state"
              required
              name="state"
              label="State"
              size="small"
              value={state}
              inputProps={{
                style: { textTransform: "uppercase" },
                maxLength: 2,
                minLength: 2,
              }}
              onChange={(ev) => {
                setState(ev.target.value);
              }}
            />
            <TextField
              className="zipCode"
              required
              name="zipCode"
              label="Zip Code"
              size="small"
              value={zipCode}
              inputProps={{
                maxLength: 5,
                minLength: 5,
              }}
              onChange={(ev) => {
                // if(ev.target.value)
                setZipCode(
                  ev.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g)
                );
              }}
            />
          </div>

          <CardElement className="cardElement" options={cardElementOptions} />
          <Button
            type="submit"
            variant="contained"
            disabled={
              isProcessing || !stripe || cart.cartData.lineItems.length === 0
            }
            size="large"
          >
            {isProcessing ? "Processing..." : "Place Order"}
          </Button>
        </form>
      </div>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    processOrder: (orderInfo) => {
      dispatch(processOrder(orderInfo));
    },
  };
};

export default connect((state) => state, mapDispatch)(Checkout);
