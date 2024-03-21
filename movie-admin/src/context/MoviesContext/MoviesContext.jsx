import { createContext, useContext, useReducer } from "react";
import MoviesReducer from "./MoviesReducer";

const initialState = {
  movies: [],
  loading: false,
  error: null,
};

const MoviesContext = createContext(initialState);

export const useMovies = () => {
  return useContext(MoviesContext);
};

const MoviesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MoviesReducer, initialState);
  return (
    <MoviesContext.Provider
      value={{
        movies: state.movies,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
