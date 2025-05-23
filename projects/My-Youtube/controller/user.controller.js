import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.config.js";

export const signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const uploadImage = await cloudinary.uploader.upload(
      req.files.logoUrl.tempFilePath
    );
    console.log("Image 👉", uploadImage);

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: hashedPassword,
      channelName: req.body.channelName,
      phone: req.body.phone,
      logoUrl: uploadImage.secure_url,
      logoId: uploadImage.public_id,
    });

    let user = await newUser.save();

    res.status(201).json({
      user,
    });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({
      message: "Error in signup controller",
      error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      email: req.body.email,
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isValid = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );

    if (!isValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        _id: existingUser._id,
        channelName: existingUser.channelName,
        email: existingUser.email,
        phone: existingUser.phone,
        logoId: existingUser.logoId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );

    res.status(200).json({
      _id: existingUser._id,
      channelName: existingUser.channelName,
      email: existingUser.email,
      phone: existingUser.phone,
      logoId: existingUser.logoId,
      logoUrl: existingUser.logoUrl,
      token: token,
      subscribers: existingUser.subscribers,
      subscribedChannels: existingUser.subscribedChannels,
    });
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({
      message: "Error in login controller",
      error,
    });
  }
};
