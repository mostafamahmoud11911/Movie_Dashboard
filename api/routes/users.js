import express from "express";
import {
  deleteUser,
  getAllUser,
  getUserStats,
  updateUser,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.put("/:id", verifyToken, updateUser);
router.get("/",verifyToken, getAllUser);
router.get("/stats", getUserStats);

export default router;
