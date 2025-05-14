import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import privateRoutes from "./routes/private.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

//connect to mongodb
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/auth", authRoutes);
app.use("/private", privateRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});

// What are we making a stateless auth system
// authentication routes (Signup, login)
// Private route (JWT (only access if authenticated))
