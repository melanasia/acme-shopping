import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../Home.css";
import { openProductModal } from "../store";
import "../Product.css";

const Product = ({ product, openProductModal }) => {
  return (
    <div
      key={product.id}
      className="product"
      data-value={product.id}
      onClick={(ev) => {
        openProductModal(ev.target.closest(".product").dataset.value);
      }}
    >
      <img src={product.image}></img>
      <p>{product.name}</p>
      <p>${product.cost}</p>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    openProductModal: (productId) => {
      dispatch(openProductModal(productId));
    },
  };
};

export default connect(null, mapDispatch)(Product);
