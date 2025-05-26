import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    channelName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String,
      required: true,
    },
    logoId: {
      type: String,
      required: true,
    },
    subscribedChannels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

// Virtual field for subscribers count
userSchema.virtual("subscribers").get(function () {
  // This will be set dynamically in the controller
  return this._subscribersCount || 0;
});

// Ensure virtuals are included in JSON and Object output
userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

const userModel = mongoose.model("User", userSchema);
export default userModel;
