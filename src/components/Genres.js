import React from "react";
import { connect } from "react-redux";
import ProductList from './ProductList'

const Genres = ({ products }) => {
  return <ProductList products={products} />;
};

export default connect((state) => state)(Genres);
