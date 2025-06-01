import express from "express";
import { authCaptain } from "../middleware/auth.middleware.js";
import {
  loginCaptainValidator,
  registerCaptainValidator,
} from "../validator/captain.validator.js";
import {
  getCaptainProfile,
  loginCaptain,
  logoutCaptain,
  registerCaptain,
} from "../controllers/captain.controller.js";

const router = express.Router();

router.post("/register", registerCaptainValidator, registerCaptain);

router.post("/login", loginCaptainValidator, loginCaptain);

router.get("/profile", authCaptain, getCaptainProfile);

router.get("/logout", authCaptain, logoutCaptain);

export default router;
