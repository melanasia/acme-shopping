import axios from "axios";

const initialState = {
  cartData: { lineItems: [] },
  cartModalIsOpen: false,
};

const cart = (state = initialState, action) => {
  if (action.type === "SET_CART") {
    state = { ...state, cartData: action.cart };
  } else if (action.type === "CLOSE_CART_MODAL") {
    state = { ...state, cartModalIsOpen: false };
  } else if (action.type === "OPEN_CART_MODAL") {
    state = { ...state, cartModalIsOpen: true };
  } else if (action.type === "EMPTY_CART") {
    state = { ...state, cartData: { lineItems: [] } };
  } else if (action.type === "ADD_ITEM_TO_CART") {
    state = { ...state, cartData: action.updatedCart };
  }
  return state;
};

export const loadLocalCart = () => {
  return (dispatch) => {
    const localCart = JSON.parse(window.localStorage.getItem("localCart"));
    if (localCart) {
      dispatch({ type: "SET_CART", cart: localCart });
    }
  };
};

export const fetchCart = () => {
  return async (dispatch, getState) => {
    const localCart = JSON.parse(window.localStorage.getItem("localCart"));
    let userCart = (
      await axios.get("/api/orders/cart", {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      })
    ).data;

    if (localCart.lineItems.length) {
      await Promise.all(
        localCart.lineItems
          .map((lineItem) => {
            const userCartProduct = userCart.lineItems.find(
              (userLineItem) => userLineItem.productId === lineItem.productId
            );
            if (userCartProduct) {
              return {
                product: { id: lineItem.productId },
                quantity: lineItem.quantity + userCartProduct.quantity,
              };
            } else {
              return {
                product: { id: lineItem.productId },
                quantity: lineItem.quantity,
              };
            }
          })
          .map((lineItem) =>
            axios.put("/api/orders/cart", lineItem, {
              headers: {
                authorization: window.localStorage.getItem("token"),
              },
            })
          )
      );
    }

    userCart = (
      await axios.get("/api/orders/cart", {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      })
    ).data;

    window.localStorage.setItem(
      "localCart",
      JSON.stringify({
        lineItems: [],
      })
    );

    dispatch({ type: "SET_CART", cart: userCart });
  };
};

export const updateLineItemQty = (lineItem) => {
  return async (dispatch, getState) => {
    try {
      if (getState().session.auth.id) {
        const response = await axios.put("/api/orders/cart", lineItem, {
          headers: {
            authorization: window.localStorage.getItem("token"),
          },
        });
        dispatch({ type: "SET_CART", cart: response.data });
      } else {
        let cart = getState().cart.cartData;
        let cartLineItems = cart.lineItems;
        cartLineItems = [
          ...cartLineItems.filter(
            (cartLineItem) => cartLineItem.productId !== lineItem.product.id * 1
          ),
          ...cartLineItems
            .filter(
              (cartLineItem) =>
                cartLineItem.productId === lineItem.product.id * 1 &&
                lineItem.quantity > 0
            )
            .map((cartLineItem) => {
              return { ...cartLineItem, quantity: lineItem.quantity };
            }),
        ];
        cart = { ...cart, lineItems: cartLineItems };
        window.localStorage.setItem("localCart", JSON.stringify(cart));
        dispatch({ type: "SET_CART", cart: cart });
      }
      return "success";
    } catch (err) {
      console.log(err);
    }
  };
};

export const closeCartModal = () => {
  return (dispatch) => {
    dispatch({ type: "CLOSE_CART_MODAL" });
  };
};

export const openCartModal = () => {
  return (dispatch) => {
    dispatch({ type: "OPEN_CART_MODAL" });
  };
};

export const emptyCart = () => {
  return (dispatch) => {
    window.localStorage.setItem(
      "localCart",
      JSON.stringify({
        lineItems: [],
      })
    );
    dispatch({ type: "EMPTY_CART" });
  };
};

export const addItemToCart = (lineItem) => {
  return async (dispatch, getState) => {
    try {
      if (getState().session.auth.id) {
        const response = await axios.put("/api/orders/cart", lineItem, {
          headers: {
            authorization: window.localStorage.getItem("token"),
          },
        });
        dispatch({ type: "SET_CART", cart: response.data });
        return "success";
      } else {
        const localCart = JSON.parse(window.localStorage.getItem("localCart"));
        let cart = getState().cart.cartData;

        const product = getState().products.find(
          (product) => product.id === lineItem.product.id
        );

        cart = {
          ...cart,
          lineItems: [
            ...cart.lineItems,
            {
              id:
                cart.lineItems.reduce((accum, lineItem) => {
                  if (lineItem.productId > accum) {
                    return (accum = lineItem.id);
                  }
                }, 0) + 1,
              productId: lineItem.product.id,
              quantity: lineItem.quantity,
              product: product,
            },
          ],
        };

        window.localStorage.setItem("localCart", JSON.stringify(cart));
        dispatch({ type: "SET_CART", cart: cart });

        return "success";
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const processOrder = (orderInfo) => {
  return async (dispatch) => {
    try {
      if (orderInfo.cart.id) {
        await axios.post("/api/orders", orderInfo.cart.id, {
          headers: {
            authorization: window.localStorage.getItem("token"),
          },
        });
        dispatch({ type: "EMPTY_CART" });
      } else {
        await axios.post("/api/orders/processGuestOrder", orderInfo);
        window.localStorage.setItem(
          "localCart",
          JSON.stringify({
            lineItems: [],
          })
        );
        dispatch({ type: "EMPTY_CART" });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export default cart;

// Temporarily used the below in the console to create records in the guest cart
// window.localStorage.setItem("localCart", JSON.stringify({lineItems: [{id: 1, productId: 2, quantity: 2, product: {name: 'test', image: 'https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg', cost: 1.99 }},{id: 2, productId: 1, quantity: 2, product: {name: 'test', image: 'https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg', cost: 1.99 }}]}));
