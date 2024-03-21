import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  updateMovie,
} from "../controllers/movies.js";

const router = express.Router();

router.post("/", verifyToken, createMovie);
router.delete("/:id", verifyToken, deleteMovie);
router.put("/:id", verifyToken, updateMovie);
router.get("/", verifyToken, getAllMovies);

export default router;
