import express from "express";
import { signup, login, updateProfile } from "../controller/user.controller.js";
import { checkAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/update-profile", checkAuth, updateProfile);

export default router;
