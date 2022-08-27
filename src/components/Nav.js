import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import AccountModal from "./AccountModal";
import CartModal from "./CartModal";
import {
  logout,
  openAccountModal,
  emptyCart,
  clearAddresses,
  // closeAccountModal,
  openCartModal,
} from "../store";
import "../Nav.css";

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      accountModalIsOpen: false,
    };
    this.onClickUser = this.onClickUser.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onClickUser() {
    if (this.props.session.auth.id) {
      this.props.history.push("/account/profile");
    } else {
      this.props.openAccountModal();
    }
  }

  onLogout() {
    this.props.logout();
    this.props.clearAddresses();
    if (
      this.props.match.params.view === "account" ||
      this.props.match.params.view === "checkout"
    ) {
      this.props.history.push("/");
    }
  }

  render() {
    const {
      session,
      genres,
      categories,
      openAccountModal,
      openCartModal,
      cart,
      history,
      match,
    } = this.props;
    const { onClickUser, onLogout } = this;
    return (
      <div className="Nav">
        {session.accountModalIsOpen ? <AccountModal /> : null}
        {cart.cartModalIsOpen ? (
          <CartModal history={history} match={match} />
        ) : null}
        <div id="header">
          <h1>Grace Shopper</h1>
          <div>
            <SearchIcon />
            <i className="fa-solid fa-user" onClick={onClickUser}></i>
            <i
              className="fa-solid fa-cart-shopping"
              onClick={openCartModal}
            ></i>
            {session.auth.id && <button onClick={onLogout}>Logout</button>}
          </div>
        </div>
        <div id="navTabs">
          <Link to="/">HOME</Link>
          <div className="dropdown">
            <Link to="/genres" className="dropbtn">
              GENRES
            </Link>
            <div className="dropdown-items">
              {" "}
              {genres.map((genre) => {
                return (
                  <Link key={genre.id} to={`/products/genre/${genre.id}`}>
                    {genre.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="dropdown">
            <Link to="/categories" className="dropbtn">
              CATEGORIES
            </Link>{" "}
            <div className="dropdown-items">
              {" "}
              {categories.map((category) => {
                return (
                  <Link
                    key={category.id}
                    to={`/products/category/${category.id}`}
                  >
                    {category.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
      dispatch(emptyCart());
    },
    openAccountModal: () => {
      dispatch(openAccountModal());
    },
    openCartModal: () => {
      dispatch(openCartModal());
    },
    clearAddresses: () => {
      dispatch(clearAddresses());
    },
  };
};

export default connect((state) => state, mapDispatch)(Nav);

function SearchIcon() {
  let history = useHistory();

  function onClickSearch() {
    history.push("/search");
  }

  return <i className="fa-solid fa-magnifying-glass" onClick={onClickSearch} />;
}