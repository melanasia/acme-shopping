import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../Home.css";
import { openProductModal } from "../store";
import Product from "./Product";

const Home = ({ categories, products, openProductModal }) => {
  return (
    <div className="home-page">
      {categories.map((category) => {
        return (
          <div key={category.id}>
            <Link
              to={`/products/category/${category.id}`}
              className="category-name"
            >
              <h2>Shop {category.name}</h2>
            </Link>
            <div className="products-list">
              {products
                .filter((product) => product.categoryId === category.id)
                .slice(0, 4)
                .map((product) => {
                  return <Product key={product.id} product={product} />;
                })}
            </div>
            <div className="see-more">
              <Link to={`/products/category/${category.id}`}>See More</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = ({ categories, products }) => {
  categories = categories.slice(0, 4);
  return { categories, products };
};

const mapDispatch = (dispatch) => {
  return {
    openProductModal: (productId) => {
      dispatch(openProductModal(productId));
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(Home);
