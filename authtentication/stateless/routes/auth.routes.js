import express from "express";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    //find the user
    const user = await User.findOne({ username });
    // if not found return error response
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    // if found compare the password
    const isMatch = await user.comparePassword(password);
    // if not match return error response
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });
    // if match create a token and return it
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ message: "Login successful", token, user: { username } });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

export default router;
