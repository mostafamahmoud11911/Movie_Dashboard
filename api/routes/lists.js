import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { createList, deleteList, getAllLists, updateList } from "../controllers/lists.js";


const router = express.Router();

router.post("/", verifyToken, createList);
router.put("/:id", verifyToken, updateList);
router.delete("/:id", verifyToken, deleteList);
router.get("/", verifyToken, getAllLists);

export default router;
