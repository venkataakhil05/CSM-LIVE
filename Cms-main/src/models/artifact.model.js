const mongoose = require("mongoose");

// ✅ Comment sub-schema
const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

// ✅ Main Artifact schema (MERGED)
const artifactSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // ✅ Likes
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // ✅ Comments
    comments: [commentSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Artifact", artifactSchema);
