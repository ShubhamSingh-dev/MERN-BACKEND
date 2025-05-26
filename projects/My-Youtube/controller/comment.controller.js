import mongoose from "mongoose";
import commentModel from "../models/comment.model.js";

export const newComment = async (req, res) => {
  try {
    const { video_id, commentText } = req.body;

    if (!video_id || !commentText) {
      return res.status(400).json({
        message: "Video ID and comment text are required",
      });
    }

    const newComment = {
      _id: new mongoose.Types.ObjectId(),
      video_id: video_id,
      commentText: commentText,
      user_id: req.user._id, // Assuming req.user is set by the auth middleware
    };

    await commentModel.create(newComment);

    res.status(201).json({
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.log("Error in newcomment controller", error);
    res.status(500).json({
      message: "Error in newcomment controller",
      error,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await commentModel.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to delete this comment",
      });
    }

    await commentModel.findByIdAndDelete(commentId);

    res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleteComment controller", error);
    res.status(500).json({
      message: "Error in deleteComment controller",
      error,
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { commentText } = req.body;

    const comment = await commentModel.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to update this comment",
      });
    }

    comment.commentText = commentText;
    await comment.save();

    res.status(200).json({
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    console.log("Error in updateComment controller", error);
    res.status(500).json({
      message: "Error in updateComment controller",
      error,
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const { videoId } = req.params;

    const comments = await commentModel
      .find({ video_id: videoId })
      .populate("user_id", "channelName logoUrl")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Comments fetched successfully",
      comments,
    });
  } catch (error) {
    console.log("Error in getComments controller", error);
    res.status(500).json({
      message: "Error in getComments controller",
      error,
    });
  }
};
