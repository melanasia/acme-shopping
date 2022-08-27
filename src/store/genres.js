import axios from "axios";

const SET_GENRES = "SET_GENRES";

const genres = (state = [], action) => {
  if (action.type === SET_GENRES) {
    return action.genres;
  }
  return state;
};

export const fetchGenres = () => {
  return async (dispatch) => {
    try {
      const genres = (await axios.get("/api/genres")).data;
      dispatch({ type: SET_GENRES, genres });
    } catch (err) {
      console.log(err);
    }
  };
};

export default genres;
