import Movie from "../Models/Movie.js";
import createError from "../utils/createError.js";

// CREATE NEW MOVIE
export const createMovie = async (req, res, next) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } else {
    next(createError(403, "Admin only can create a new movie!"));
  }
};

// UPDATE MOVIE
export const updateMovie = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedMovie);
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "Admin only can update a movie!"));
  }
};

// DELETE MOVIE
export const deleteMovie = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("Movie has been deleted!");
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "Admin only can delete a movie!"));
  }
};

// GET ALL MOVIES
export const getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies.reverse());
  } catch (error) {
    next(error);
  }
};
