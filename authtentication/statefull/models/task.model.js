import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    // userID is the ID of the user who created the task
    // this is a reference to the User model as user are cerated in user model
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
