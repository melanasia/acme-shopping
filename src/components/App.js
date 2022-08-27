import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchCart,
  exchangeToken,
  logout,
  fetchCategories,
  fetchGenres,
  fetchProducts,
  loadLocalCart,
  getAddresses,
} from "../store";
import { Link, Route, Switch } from "react-router-dom";
import SignIn from "./SignIn";
import Cart from "./Cart";
import Nav from "./Nav";
import Home from "./Home";
import Genres from "./Genres";
import Categories from "./Categories";
import Products from "./Products";
import Account from "./Account";
import AddressForm from "./AddressForm";
import CartModal from "./CartModal";
import OrdersHistory from "./OrdersHistory";
import ProductsInfo from "./ProductsInfo";
import CreateProduct from "./CreateProduct";
import UsersInfo from "./UsersInfo";
import Search from "./Search";
import ProductModal from "./ProductModal";
import Checkout from "./Checkout";
import SuccessfulCheckout from "./SuccessfulCheckout";

class App extends React.Component {
  componentDidMount() {
    this.props.exchangeToken();
    this.props.loadCategories();
    this.props.loadGenres();
    this.props.loadProducts();
    this.props.loadLocalCart();
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.session.auth.id && this.props.session.auth.id) {
      this.props.fetchCart();
      this.props.getAddresses();
    }
  }
  render() {
    const { session, logout, cart, productModal } = this.props;
    return (
      <main>
        <Route path="/:view?" component={Nav} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/genres" exact>
            <Genres />
          </Route>
          <Route path="/categories" exact>
            <Categories />
          </Route>

          <Route path="/search" exact>
            <Search />
          </Route>
          <Route path="/account/products-info" component={ProductsInfo} />
          <Route path="/account/profile" component={Account} />
          <Route path="/account/addresses" component={AddressForm} />
          <Route path="/account/orders" component={OrdersHistory} />
          <Route path="/account/add-product" component={CreateProduct} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/successfulCheckout" component={SuccessfulCheckout} />
          <Route path="/account/users-info" component={UsersInfo} />
        </Switch>
        <Route
          path={["/products/category/:id", "/products/genre/:id"]}
          component={Products}
        />
        {session.auth.id ? (
          <Fragment>
            <Route path="/cart" component={CartModal} />
          </Fragment>
        ) : null}
        {productModal.productModalIsOpen ? <ProductModal /> : null}
      </main>
    );
  }
}
const mapDispatch = (dispatch) => {
  return {
    exchangeToken: () => dispatch(exchangeToken()),
    logout: () => dispatch(logout()),
    fetchCart: () => dispatch(fetchCart()),
    loadCategories: () => dispatch(fetchCategories()),
    loadGenres: () => dispatch(fetchGenres()),
    loadProducts: () => dispatch(fetchProducts()),
    loadLocalCart: () => dispatch(loadLocalCart()),
    getAddresses: () => dispatch(getAddresses()),
  };
};
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, mapDispatch)(App);

// {session.auth.id ? (
//   <Link to="/cart">Cart ({cart.cartData.lineItems.length})</Link>
// ) : null}

// <Route path="/cart" component={Cart} />
