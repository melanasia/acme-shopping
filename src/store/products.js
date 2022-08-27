import axios from "axios";

const SET_PRODUCTS = "SET_PRODUCTS";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const ADD_PRODUCT = "ADD_PRODUCT";

const products = (state = [], action) => {
  if (action.type === SET_PRODUCTS) {
    return action.products;
  }
  if (action.type === ADD_PRODUCT) {
    return [...state, action.product];
  }
  if (action.type === DELETE_PRODUCT) {
    return state.filter((product) => product.id !== action.product.id);
  }
  if (action.type === UPDATE_PRODUCT) {
    return state.map((product) =>
      product.id === action.product.id ? action.product : product
    );
  }
  return state;
};

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const products = (await axios.get("/api/products")).data;
      dispatch({ type: SET_PRODUCTS, products });
    } catch (err) {
      console.log(err);
    }
  };
};

export const createProduct = (product, history) => {
  return async (dispatch) => {
    try {
      product = (
        await axios.post("/api/products", product, {
          headers: {
            authorization: window.localStorage.getItem("token"),
          },
        })
      ).data;
      dispatch({ type: ADD_PRODUCT, product });
      history.push("/account/products-info");
    } catch (err) {
      console.log(err);
      alert("Please enter valid data");
    }
  };
};

export const deleteProduct = (product) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/products/${product.id}`, {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      });
      dispatch({ type: DELETE_PRODUCT, product });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateProduct = (product) => {
  return async (dispatch) => {
    try {
      product = (
        await axios.put(`/api/products/${product.id}`, product, {
          headers: {
            authorization: window.localStorage.getItem("token"),
          },
        })
      ).data;
      dispatch({ type: UPDATE_PRODUCT, product });
    } catch (err) {
      console.log(err);
      alert("Please enter valid data");
    }
  };
};

export default products;
