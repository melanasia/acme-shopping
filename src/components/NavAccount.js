import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import "../Account.css";

const NavAccount = ({ session }) => {
  const path = useRouteMatch().path;
  return (
    <nav>
      <Link
        to="/account/profile"
        className={path === "/account/profile" ? "selected" : ""}
      >
        Profile
      </Link>
      <Link
        to="/account/addresses"
        className={path === "/account/addresses" ? "selected" : ""}
      >
        Addresses
      </Link>
      <Link
        to="/account/orders"
        className={path === "/account/orders" ? "selected" : ""}
      >
        Purchases
      </Link>
      {session.auth.userType === "admin" ? (
        <Fragment>
          <Link
            to="/account/add-product"
            className={path === "/account/add-product" ? "selected" : ""}
          >
            Create Product
          </Link>
          <Link
            to="/account/products-info"
            className={path === "/account/products-info" ? "selected" : ""}
          >
            Products
          </Link>
          <Link
            to="/account/users-info"
            className={path === "/account/users-info" ? "selected" : ""}
          >
            Users
          </Link>
        </Fragment>
      ) : null}
    </nav>
  );
};

export default connect((state) => state)(NavAccount);
