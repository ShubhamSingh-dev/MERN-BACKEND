import express from "express";
import {
  signup,
  Logout,
  Login,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/Login", Login);
router.post("/logout", Logout);

router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);

export default router;
