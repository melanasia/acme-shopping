import axios from "axios";

const initialState = {
  auth: {},
  invalidLogin: false,
  accountModalIsOpen: false,
  users: [],
};

const session = (state = initialState, action) => {
  if (action.type === "SET_AUTH") {
    state = { ...state, auth: action.auth };
  } else if (action.type === "SET_INVALID_LOGIN") {
    state = { ...state, invalidLogin: true };
  } else if (action.type === "UPDATE_USER") {
    return { ...state, auth: action.auth };
  } else if (action.type === "OPEN_ACCOUNT_MODAL") {
    state = { ...state, accountModalIsOpen: true };
  } else if (action.type === "CLOSE_ACCOUNT_MODAL") {
    state = { ...state, accountModalIsOpen: false };
  } else if (action.type === "GET_USERS") {
    state = { ...state, users: action.users };
  } else if (action.type === "UPDATE_USER_INFO") {
    state = { ...state, user: action.user };
  }
  return state;
};

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem("token");
    dispatch({ type: "SET_AUTH", auth: {} });
  };
};

export const exchangeToken = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/sessions", {
        headers: {
          authorization: token,
        },
      });
      const auth = response.data;
      dispatch({ auth, type: "SET_AUTH" });
    }
  };
};

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      let response = await axios.post("/api/sessions", credentials);
      const { token } = response.data;
      window.localStorage.setItem("token", token);
      response = await axios.get("/api/sessions", {
        headers: {
          authorization: token,
        },
      });
      const auth = response.data;
      dispatch({ auth, type: "SET_AUTH" });
      dispatch({ type: "CLOSE_ACCOUNT_MODAL" });
    } catch (err) {
      if (err.response.status === 401) {
        dispatch({ type: "SET_INVALID_LOGIN" });
      }
      //console.log(err.response.status);
    }
  };
};

export const updateUser = (auth) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        auth = (
          await axios.put("/api/sessions", auth, {
            headers: {
              authorization: token,
            },
          })
        ).data;
        dispatch({ type: "UPDATE_USER", auth });
      }
    } catch (ex) {
      console.log(ex);
      alert("Please enter valid data");
    }
  };
};

export const openAccountModal = () => {
  return (dispatch) => {
    dispatch({ type: "OPEN_ACCOUNT_MODAL" });
  };
};

export const closeAccountModal = () => {
  return (dispatch) => {
    dispatch({ type: "CLOSE_ACCOUNT_MODAL" });
  };
};

export const createUser = (user) => {
  return async (dispatch) => {
    try {
      //console.log(user);
      let createdUser = (await axios.post("/api/users", user)).data;
      let response = await axios.post("/api/sessions", {
        email: user.email,
        password: user.password,
      });
      const { token } = response.data;
      window.localStorage.setItem("token", token);
      response = await axios.get("/api/sessions", {
        headers: {
          authorization: token,
        },
      });
      const auth = response.data;
      dispatch({ auth, type: "SET_AUTH" });
      dispatch({ type: "CLOSE_ACCOUNT_MODAL" });
    } catch (err) {
      console.log(err);
    }
    //dispatch({ type: "CREATE_USER" });
  };
};

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/users", {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      });
      dispatch({ type: "GET_USERS", users: response.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateUserInfo = (user) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        user = (
          await axios.put(`/api/users/${user.id}`, user, {
            headers: {
              authorization: token,
            },
          })
        ).data;
        dispatch({ type: "UPDATE_USER_INFO", user });
      }
    } catch (ex) {
      console.log(ex);
    }
  };
};

export default session;
