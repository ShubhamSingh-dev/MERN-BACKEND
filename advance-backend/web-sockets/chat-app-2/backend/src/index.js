import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; //why is cors used? ans: to allow cross-origin requests ie telling backend which sites are allowed to access the backend

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js"; //importing auth routes

dotenv.config();

const PORT = process.env.PORT || 4050;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
); //why is credentials true? ans: to allow cookies to be sent with cross-origin requests

//Routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
