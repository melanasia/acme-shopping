import axios from "axios";

const GET_ADDRESSES = "GET_ADDRESSES";
const ADD_ADDRESS = "ADD_ADDRESS";
const DELETE_ADDRESS = "DELETE_ADDRESS";
const CLEAR_ADDRESSES = "CLEAR_ADDRESSES";

const addresses = (state = [], action) => {
  if (action.type === GET_ADDRESSES) {
    return action.addresses;
  }
  if (action.type === ADD_ADDRESS) {
    return [...state, action.address];
  }
  if (action.type === DELETE_ADDRESS) {
    return state.filter((address) => address !== action.address);
  }
  if (action.type === CLEAR_ADDRESSES) {
    return [];
  }
  return state;
};

export const getAddresses = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const response = await axios.get("/api/addresses", {
          headers: {
            authorization: token,
          },
        });
        dispatch({ type: GET_ADDRESSES, addresses: response.data });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const createAddress = (address) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        // address = { ...address, isPrimary: true };
        const updatedAddresses = (
          await axios.post("/api/addresses", address, {
            headers: {
              authorization: token,
            },
          })
        ).data;
        dispatch({ type: GET_ADDRESSES, addresses: updatedAddresses });
      }
    } catch (err) {
      console.log(err);
      alert("Please enter valid data");
    }
  };
};

export const deleteAddress = (address) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/addresses/${address.id}`, {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      });
      dispatch({ type: DELETE_ADDRESS, address });
    } catch (err) {
      console.log(err);
    }
  };
};

export const clearAddresses = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_ADDRESSES });
  };
};

export default addresses;
