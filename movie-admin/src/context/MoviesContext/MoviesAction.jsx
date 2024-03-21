// get movies loading
export const getMoviesLoading = () => ({
  type: "GET_MOVIES_LOADING",
});

// get movies success
export const getMoviesSuccess = (movies) => ({
  type: "GET_MOVIES_SUCCESS",
  payload: movies,
});

// get movies failure
export const getMoviesFailure = (error) => ({
  type: "GET_MOVIES_FAILURE",
  payload: error,
});

// create a new movie

export const createMovieLoading = () => ({
  type: "CREATE_MOVIE_LOADING",
});

// create movie success

export const createMovieSuccess = (movie) => ({
  type: "CREATE_MOVIE_SUCCESS",
  payload: movie,
});

// create movie failure

export const createMovieFailure = (error) => ({
  type: "CREATE_MOVIE_FAILURE",
  payload: error,
});

// delete movie loading

export const deleteMovieLoading = () => ({
  type: "DELETE_MOVIE_LOADING",
});

// delete movie success

export const deleteMovieSuccess = (id) => ({
  type: "DELETE_MOVIE_SUCCESS",
  payload: id,
});

// delete movie failure

export const deleteMovieFailure = (error) => ({
  type: "DELETE_MOVIE_FAILURE",
  payload: error,
});


// update movie loading

export const updateMovieLoading =()=>({
    type:'UPDATE_MOVIE_LOADING'
});


// update movie success

export const updateMovieSuccess = (movie)=>({
    type: 'UPDATE_MOVIE_SUCCESS',
    payload: movie
})


// update movie failure

export const updateMovieFailure = (error)=>({
    type: 'UPDATE_MOVIE_FAILURE',
    payload: error
})