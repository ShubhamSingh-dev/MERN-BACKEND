import userModel from "../models/user.model.js";
import captainModel from "../models/captain.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id).select("-password");
    req.user = user;

    return next();
  } catch (error) {
    console.error("Error in authUser middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel
      .findById(decoded._id)
      .select("-password"); // Use captainModel
    if (!captain) {
      return res.status(403).json({ message: "Forbidden access" });
    }
    req.captain = captain;

    return next();
  } catch (error) {
    console.error("Error in authCaptain middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
