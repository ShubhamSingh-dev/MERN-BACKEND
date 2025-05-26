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

export const updateProfile = async (req, res) => {
  try {
    const { channelName, phone } = req.body;
    let updateData = { channelName, phone };

    if (req.files && req.files.logoUrl) {
      const uploadImage = await cloudinary.uploader.upload(
        req.files.logoUrl.tempFilePath
      );
      updateData.logoUrl = uploadImage.secure_url;
      updateData.logoId = uploadImage.public_id;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "Profile updated successfully", updatedUser });
  } catch (error) {
    console.log("Error in updateProfile controller", error);
    res.status(500).json({
      message: "Error in updateProfile controller",
      error,
    });
  }
};

export const subscribe = async (req, res) => {
  try {
    const { channelId } = req.body;
    if (req.user._id.toString() === channelId.toString()) {
      return res.status(400).json({
        message: "You cannot subscribe to your own channel",
      });
    }

    // Check if already subscribed
    const currentUser = await User.findById(req.user._id);
    if (currentUser.subscribedChannels.includes(channelId)) {
      return res.status(400).json({
        message: "Already subscribed to this channel",
      });
    }

    // Add to subscribedChannels (no increment needed, count will be virtual)
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { subscribedChannels: channelId },
    });

    // Get the updated user (subscriber)
    const updatedCurrentUser = await User.findById(req.user._id);

    // Get the channel user and count subscribers dynamically
    const subscribedUser = await User.findById(channelId);
    if (!subscribedUser) {
      return res.status(404).json({ message: "Channel not found" });
    }
    // Count how many users have this channelId in their subscribedChannels
    const subscribersCount = await User.countDocuments({
      subscribedChannels: channelId,
    });
    // Attach the count for the virtual field
    subscribedUser._doc._subscribersCount = subscribersCount;

    res.status(200).json({
      message: "Subscribed successfully",
      data: { currentUser: updatedCurrentUser, subscribedUser },
    });
  } catch (error) {
    console.log("Error in subscribe controller", error);
    res.status(500).json({
      message: "Error in subscribe controller",
      error,
    });
  }
};
