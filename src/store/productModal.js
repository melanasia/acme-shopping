const initialState = {
  productId: "",
  productModalIsOpen: false,
};

const productModal = (state = initialState, action) => {
  if (action.type === "OPEN_PRODUCT_MODAL") {
    state = { ...state, productModalIsOpen: true };
  } else if (action.type === "CLOSE_PRODUCT_MODAL") {
    state = { ...state, productModalIsOpen: false };
  } else if (action.type === "SET_PRODUCT_ID") {
    state = { ...state, productId: action.productId };
  }
  return state;
};

export const closeProductModal = () => {
  return (dispatch) => {
    dispatch({ type: "CLOSE_PRODUCT_MODAL" });
  };
};

export const openProductModal = (productId) => {
  return (dispatch) => {
    dispatch({ type: "SET_PRODUCT_ID", productId: productId });
    dispatch({ type: "OPEN_PRODUCT_MODAL" });
  };
};

export const setProductId = (productId) => {
  return (dispatch) => {
    dispatch({ type: "SET_PRODUCT_ID", productId: productId });
  };
};

export default productModal;
