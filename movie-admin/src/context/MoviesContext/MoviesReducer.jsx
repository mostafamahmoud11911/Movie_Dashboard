const MoviesReducer = (state, action) => {
  switch (action.type) {
    case "GET_MOVIES_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "GET_MOVIES_SUCCESS":
      return {
        movies: action.payload,
        loading: false,
        error: null,
      };
    case "GET_MOVIES_FAILURE":
      return {
        movies: [],
        loading: false,
        error: action.payload,
      };
    case "CREATE_MOVIE_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "CREATE_MOVIE_SUCCESS":
      return {
        movies: [...state.movies, action.payload],
        loading: false,
        error: null,
      };
    case "CREATE_MOVIE_FAILURE":
      return {
        movies: [],
        loading: false,
        error: action.payload,
      };
    case "DELETE_MOVIE_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "DELETE_MOVIE_SUCCESS":
      return {
        movies: state.movies.filter((movie) => movie._id !== action.payload),
        loading: false,
        error: null,
      };
    case "DELETE_MOVIE_FAILURE":
      return {
        movies: [],
        loading: false,
        error: action.payload,
      };
    case "UPDATE_MOVIE_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "UPDATE_MOVIE_SUCCESS":
      return {
        movies: state.movies.findIndex(
          (movie) => movie._id === action.payload._id && action.payload
        ),
        loading: false,
        error: null,
      };
    case "UPDATE_MOVIE_FAILURE":
      return {
        movies: [],
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};


export default MoviesReducer;