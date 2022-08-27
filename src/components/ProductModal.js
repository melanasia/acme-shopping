import React from "react";
import { connect } from "react-redux";
import "../ProductModal.css";
import { closeProductModal, addItemToCart, updateLineItemQty } from "../store";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

class ProductModal extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };
  }

  render() {
    const {
      closeProductModal,
      addItemToCart,
      updateLineItemQty,
      productModal,
      products,
      cart,
    } = this.props;

    const { quantity } = this.state;

    const alreadyInCart = cart.cartData.lineItems.find(
      (lineItem) => lineItem.productId === this.props.productModal.productId * 1
    )
      ? true
      : false;

    const cartQuantity = alreadyInCart
      ? cart.cartData.lineItems.find(
          (lineItem) =>
            lineItem.productId === this.props.productModal.productId * 1
        ).quantity
      : 0;

    console.log(cartQuantity);

    const product = products.find(
      (product) => product.id === productModal.productId * 1
    );
    return (
      <div id="productModal">
        <div
          className="modalBackground"
          onClick={() => closeProductModal()}
        ></div>
        <div className="modal">
          <div className="modal-content">
            <h2>{product.name}</h2>
            <img src={product.image} />
            <h2>{`$${(product.cost * 1).toFixed(2)}`}</h2>
            <div>
              <div className="itemQuantity">
                <IconButton
                  disabled={quantity <= 1 ? true : false}
                  onClick={() => {
                    this.setState({ quantity: quantity - 1 });
                  }}
                >
                  <RemoveIcon />
                </IconButton>
                <p>{quantity}</p>
                <IconButton
                  disabled={
                    quantity + cartQuantity >= product.inventory ? true : false
                  }
                  onClick={() => {
                    this.setState({ quantity: quantity + 1 });
                  }}
                >
                  <AddIcon />
                </IconButton>
              </div>
              <Button
                variant="contained"
                size="large"
                disabled={product.inventory ? false : true}
                onClick={() => {
                  alreadyInCart
                    ? updateLineItemQty({
                        quantity: quantity + cartQuantity,
                        product: { id: product.id },
                      })
                    : addItemToCart({
                        quantity: quantity,
                        product: { id: product.id },
                      });
                }}
              >
                {product.inventory ? "ADD TO CART" : "OUT OF STOCK"}
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
    closeProductModal: () => {
      dispatch(closeProductModal());
    },
    addItemToCart: async (lineItem) => {
      const add = await dispatch(addItemToCart(lineItem));
      if (add === "success") {
        dispatch(closeProductModal());
      }
    },
    updateLineItemQty: async (lineItem) => {
      const update = await dispatch(updateLineItemQty(lineItem));
      if (update === "success") {
        dispatch(closeProductModal());
      }
    },
  };
};

export default connect((state) => state, mapDispatch)(ProductModal);
