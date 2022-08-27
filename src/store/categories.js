import axios from "axios";

const SET_CATEGORIES = "SET_CATEGORIES";

const categories = (state = [], action) => {
  if (action.type === SET_CATEGORIES) {
    return action.categories;
  }
  return state;
};

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const categories = (await axios.get("/api/categories")).data;
      dispatch({ type: SET_CATEGORIES, categories });
    } catch (err) {
      console.log(err);
    }
  };
};

export default categories;
