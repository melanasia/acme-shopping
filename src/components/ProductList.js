import React from "react";
import Product from "./Product";
import "../ProductList.css";

const ProductList = ({ products }) => {
  return (
    <div
      className="product-list">
      {products.map(
        (product) => {
          return <Product key={product.id} product={product} />;
        }
      )}
    </div>
  );
};

export default ProductList;