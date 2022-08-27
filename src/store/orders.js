import axios from "axios";

const GET_ORDERS = "GET_ORDERS";

const orders = (state = [], action) => {
  if (action.type === GET_ORDERS) {
    return action.orders;
  }
  return state;
};

export const getOrders = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/orders", {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      });
      dispatch({ type: GET_ORDERS, orders: response.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export default orders;
