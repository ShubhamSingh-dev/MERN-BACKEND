import express from "express";
import {
  deleteVideo,
  dislike,
  getAllVideos,
  getOwnVideos,
  getVideoById,
  getVideosByCategory,
  getVideosByTag,
  like,
  update,
  upload,
} from "../controller/video.controller.js";
import { checkAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

// upload video
router.post("/upload", checkAuth, upload);

//update video (no video change , only metadata & thumbnail change)
router.put("/update/:id", checkAuth, update);

//delete video
router.delete("/delete/:id", checkAuth, deleteVideo);

// 🔹 Get All Videos
router.get("/all", getAllVideos);

// 🔹 Get Own Videos
router.get("/my-videos", checkAuth, getOwnVideos);

// 🔹 Get Video by ID
router.get("/:id", checkAuth, getVideoById);

// 🔹 Get Videos by Category
router.get("/category/:category", getVideosByCategory);

// 🔹 Get Videos by Tags
router.get("/tags/:tag", getVideosByTag);

// 🔹 Like Video
router.post("/like", checkAuth, like);

// 🔹 Dislike Video
router.post("/dislike", checkAuth, dislike);

export default router;
