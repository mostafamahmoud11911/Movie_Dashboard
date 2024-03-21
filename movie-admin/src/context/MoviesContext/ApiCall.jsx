import axios from "axios";
import {
  createMovieFailure,
  createMovieLoading,
  createMovieSuccess,
  deleteMovieFailure,
  deleteMovieLoading,
  deleteMovieSuccess,
  getMoviesFailure,
  getMoviesLoading,
  getMoviesSuccess,
  updateMovieFailure,
  updateMovieLoading,
  updateMovieSuccess,
} from "./MoviesAction";

//  GET MOVIES
export const getMovies = async (dispatch) => {
  dispatch(getMoviesLoading());
  try {
    const { data } = await axios.get(`https://api-cmuv.onrender.com/api/movies`, {
      headers: {
        token: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`,
      },
    });
    dispatch(getMoviesSuccess(data));

  } catch (error) {
    dispatch(getMoviesFailure(error.response.data.message));
  }
};

// DELETE MOVIE

export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieLoading());
  try {
    await axios.delete(`https://api-cmuv.onrender.com/api/movies/${id}`, {
      headers: {
        token: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`,
      },
    });
    dispatch(deleteMovieSuccess(id));
  } catch (error) {
    dispatch(deleteMovieFailure(error.response.data.message));
  }
};

// CREATE MOVIE

export const createMovie = async (movie, dispatch) => {
  dispatch(createMovieLoading());

  try {
    const { data } = await axios.post(
      `https://api-cmuv.onrender.com/api/movies`,
      movie,
      {
        headers: {
          token: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`,
        },
      }
    );
    dispatch(createMovieSuccess(data));
    return data;
  } catch (error) {
    dispatch(createMovieFailure(error));
  }
};

// UPDATE MOVIE

export const updateMovie = async (movie, id, dispatch) => {

  dispatch(updateMovieLoading());
  try {
    const { data } = await axios.put(
      `https://api-cmuv.onrender.com/api/movies/${id}`,
      movie,
      {
        headers: {
          token: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`,
        },
      }
    );
    dispatch(updateMovieSuccess(data));
    return data;
  } catch (error) {
    dispatch(updateMovieFailure(error.response.data.message));
  }
};
