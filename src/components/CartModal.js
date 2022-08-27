import React from "react";
import { connect } from "react-redux";
import "../CartModal.css";
// import Cart from "./Cart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";

import { closeCartModal, updateLineItemQty } from "../store";

class CartModal extends React.Component {
  constructor() {
    super();
    this.onClickCheckout = this.onClickCheckout.bind(this);
  }

  onClickCheckout() {
    if (this.props.match.params.view === "checkout") {
      this.props.closeCartModal();
    } else {
      this.props.history.push("/checkout");
      this.props.closeCartModal();
    }
  }

  render() {
    const { closeCartModal, cart, updateLineItemQty } = this.props;
    const { onClickCheckout } = this;
    console.log(this.props);

    return (
      <div id="cartModal">
        <div className="modalBackground" onClick={() => closeCartModal()} />
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">GRACE SHOPPER CART</h2>
            </div>
            <div className="modal-body">
              {cart.cartData.lineItems.length ? (
                cart.cartData.lineItems
                  .sort((a, b) => a.id - b.id)
                  .map((lineItem) => {
                    return (
                      <div key={lineItem.productId} className="lineItem">
                        <img src={lineItem.product.image} />
                        <div>
                          <h3>{lineItem.product.name}</h3>
                          <div className="lineItemQuantity">
                            <RemoveIcon
                              productid={lineItem.productId}
                              onClick={(ev) => {
                                console.log(ev.target);
                                updateLineItemQty({
                                  product: {
                                    id:
                                      ev.target.getAttribute("productid") ||
                                      ev.target.parentNode.getAttribute(
                                        "productid"
                                      ),
                                  },
                                  quantity: lineItem.quantity - 1,
                                });
                              }}
                            />
                            <p>{lineItem.quantity}</p>
                            <AddIcon
                              productid={lineItem.productId}
                              onClick={(ev) => {
                                updateLineItemQty({
                                  product: {
                                    id:
                                      ev.target.getAttribute("productid") ||
                                      ev.target.parentNode.getAttribute(
                                        "productid"
                                      ),
                                  },
                                  quantity: lineItem.quantity + 1,
                                });
                              }}
                            />
                          </div>
                        </div>
                        <h3>
                          {(lineItem.product.cost * lineItem.quantity).toFixed(
                            2
                          )}
                        </h3>
                      </div>
                    );
                  })
              ) : (
                <h3>Your cart is empty</h3>
              )}
            </div>
            <div className="modal-footer">
              <h2>
                TOTAL: &nbsp;
                {cart.cartData.lineItems.length &&
                  cart.cartData.lineItems
                    .reduce((accum, lineItem) => {
                      return accum + lineItem.product.cost * lineItem.quantity;
                    }, 0)
                    .toFixed(2)}
              </h2>
              <Button
                type="submit"
                variant="contained"
                disabled={cart.cartData.lineItems.length === 0}
                size="large"
                onClick={onClickCheckout}
              >
                CHECKOUT
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    closeCartModal: () => {
      dispatch(closeCartModal());
    },
    updateLineItemQty: (lineItem) => {
      dispatch(updateLineItemQty(lineItem));
    },
  };
};

export default connect((state) => state, mapDispatch)(CartModal);
