const mongoose = require("mongoose"),
  { Schema, model } = mongoose,
  { ObjectId } = Schema;

const PostSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "users",
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    images: {
      type: String,
    },
    imageId: {
      type: String,
    },
    likes: [
      {
        type: ObjectId,
        ref: "users",
      },
    ],
    comments: [
      {
        user: {
          type: ObjectId,
          ref: "users",
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = Post = model("post", PostSchema);
