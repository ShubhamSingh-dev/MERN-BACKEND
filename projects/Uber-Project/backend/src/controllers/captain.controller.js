import captainModel from "../models/captain.model.js";
import { validationResult } from "express-validator";
import { createCaptain } from "../services/captain.services.js";

export const registerCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExists = await captainModel.findOne({ email });
    if (isCaptainAlreadyExists) {
      return res.status(400).json({ message: "Captain already exists" });
    }

    const hashPassword = await captainModel.hashPassword(password);

    const captain = await createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashPassword,
      vehicle: {
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
      },
    });

    const token = captain.generateAuthToken();

    res.status(201).json({
      message: "Captain registered successfully",
      captain,
      token: token,
    });
  } catch (error) {
    console.error("Error registering captain:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(400).json({ message: "Captain not found" });
    }

    const isMatched = await captain.comparePassword(password);
    if (!isMatched) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = captain.generateAuthToken();

    res.status(200).json({
      message: "Captain logged in successfully",
      captain,
      token: token,
    });
  } catch (error) {
    console.error("Error logging in captain:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCaptainProfile = async (req, res) => {
  try {
    const captain = req.captain;
    if (!captain) {
      return res.status(404).json({ message: "Captain not found" });
    }

    res.status(200).json({
      message: "Captain profile retrieved successfully",
      captain,
    });
  } catch (error) {
    console.error("Error retrieving captain profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutCaptain = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Captain logged out successfully" });
};
