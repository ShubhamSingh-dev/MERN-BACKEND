import express from "express";
import { checkAuth } from "../middleware/auth.middleware.js";
import {
  deleteComment,
  getComments,
  newComment,
  updateComment,
} from "../controller/comment.controller.js";

const router = express.Router();

router.post("/new", checkAuth, newComment);
router.delete("/:commentId", checkAuth, deleteComment);
router.put("/:commentId", checkAuth, updateComment);
router.get("/comment/:videoId", checkAuth, getComments);

export default router;
