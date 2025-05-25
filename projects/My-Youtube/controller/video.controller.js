import mongoose from "mongoose";

import User from "../models/user.model.js";
import Video from "../models/video.model.js";
import cloudinary from "../config/cloudinary.config.js";

export const upload = async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;
    if (!req.files || !req.files.video || !req.files.thumbnail) {
      return res.status(400).json({
        error: "Video and thumbnail are required",
      });
    }

    const videoUpload = await cloudinary.uploader.upload(
      req.files.video.tempFilePath,
      { resource_type: "video", folder: "videos" }
    );

    const thumbnailUpload = await cloudinary.uploader.upload(
      req.files.thumbnail.tempFilePath,
      { folder: "videos" }
    );

    const newVideo = new Video({
      _id: new mongoose.Types.ObjectId(),
      title,
      description,
      user_id: req.user._id,
      videoUrl: videoUpload.secure_url,
      thumbnailUrl: thumbnailUpload.secure_url,
      category,
      tags: tags ? tags.split(",") : [],
      thumbnailId: thumbnailUpload.public_id,
    });

    await newVideo.save();

    res.status(201).json({
      message: "Video uploaded successfully",
      video: newVideo,
    });
  } catch (error) {
    console.log("Error in upload controller", error);
    res.status(500).json({
      message: "Error in upload controller",
      error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;
    const videoId = req.params.id;

    //find video by id
    let video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    //ownership check
    if (video.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        error: "unauthorized",
      });
    }

    if (req.files && req.files.thumbnail) {
      //first destroy the old thumbnail
      await cloudinary.uploader.destroy(video.thumbnailId);

      //upload new thumbnail
      const thumbnailUpload = await cloudinary.uploader.upload(
        req.files.thumbnail.tempFilePath,
        { folder: "videos" }
      );

      //update video document with new thumbnail
      video.thumbnailUrl = thumbnailUpload.secure_url;
      video.thumbnailId = thumbnailUpload.public_id;
    }

    video.title = title || video.title;
    video.description = description || video.description;
    video.category = category || video.category;
    video.tags = tags ? tags.split(",") : [];

    await video.save();
    res.status(200).json({
      message: "Video updated successfully",
      video,
    });
  } catch (error) {
    console.log("Error in update controller", error);
    res.status(500).json({
      message: "Error in update controller",
      error,
    });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const videoId = req.params.id;

    let video = await Video.findById(`video/${videoId}`);
    if (!video) return res.status(404).json({ error: "Video not found" });

    if (video.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(video.videoId, {
      resource_type: "video",
    });
    await cloudinary.uploader.destroy(video.thumbnailId);

    await Video.findByIdAndDelete(videoId);
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getOwnVideos = async (req, res) => {
  try {
    const videos = await Video.find({ user_id: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(videos);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const videoId = req.params.id;
    const userId = req.user._id;

    // Use findByIdAndUpdate to add the user ID to the viewedBy array if not already present
    const video = await Video.findByIdAndUpdate(
      videoId,
      {
        $addToSet: { viewedBy: userId }, // Add user ID to viewedBy array, avoiding duplicates
      },
      { new: true } // Return the updated video document
    );

    if (!video) return res.status(404).json({ error: "Video not found" });

    res.status(200).json(video);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getVideosByTag = async (req, res) => {
  try {
    const tag = req.params.tag;
    const videos = await Video.find({ tags: tag }).sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getVideosByCategory = async (req, res) => {
  try {
    const videos = await Video.find({ category: req.params.category }).sort({
      createdAt: -1,
    });
    res.status(200).json(videos);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const like = async (req, res) => {
  try {
    const { videoId } = req.body;

    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likedBy: req.user._id },
      $pull: { disLikedBy: req.user._id }, // Remove from dislikes if previously disliked
    });

    res.status(200).json({ message: "Liked the video" });
  } catch (error) {
    console.error("Like Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const dislike = async (req, res) => {
  try {
    const { videoId } = req.body;

    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { disLikedBy: req.user._id },
      $pull: { likedBy: req.user._id },
    });

    res.status(200).json({ message: "Disliked the video" });
  } catch (error) {
    console.error("Dislike Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
