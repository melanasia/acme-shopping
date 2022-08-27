import React from "react";
import { connect } from "react-redux";
import "../Account.css";
import { updateProduct, deleteProduct } from "../store";
import EditProduct from "./EditProduct";
import NavAccount from "./NavAccount";

class ProductsInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      openModal: false,
      product: {},
    };
    this.handleClose = this.handleClose.bind(this);
  }
  handleClose() {
    this.setState({ openModal: false });
  }

  render() {
    let { products, session, categories, genres, deleteProduct } = this.props;
    products = products.slice(0, 50);

    return (
      <div id="account-page">
        <h2>Products Table</h2>
        <div className="container">
          <NavAccount />
          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Genre</th>
                <th>Cost</th>
                <th>Inventory</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>
                      {
                        categories.find(
                          (category) => category.id === product.categoryId
                        ).name
                      }
                    </td>
                    <td>
                      {
                        genres.find((genre) => genre.id === product.genreId)
                          .name
                      }
                    </td>
                    <td>${product.cost}</td>
                    <td>{product.inventory}</td>

                    <td>
                      <i
                        onClick={() =>
                          this.setState({
                            openModal: true,
                            product: product,
                          })
                        }
                        className="fa-solid fa-pencil"
                      ></i>
                    </td>
                    <td>
                      <i
                        onClick={() => deleteProduct(product)}
                        className="fa-regular fa-trash-can"
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <EditProduct
            product={this.state.product}
            open={this.state.openModal}
            onClose={this.handleClose}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories || [],
    genres: state.genres || [],
    products: state.products || [],
    session: state.session,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateProduct: (product) => dispatch(updateProduct(product)),
    deleteProduct: (product) => dispatch(deleteProduct(product)),
  };
};

export default connect(mapStateToProps, mapDispatch)(ProductsInfo);
