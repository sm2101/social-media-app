const mongoose = require("mongoose"),
  { Schema, model } = mongoose,
  { ObjectId } = Schema;

const messageSchema = new Schema(
  {
    convoId: {
      type: ObjectId,
      ref: "convo",
      required: true,
    },
    senderId: {
      type: ObjectId,
      ref: "users",
      required: true,
    },
    type: {
      type: String,
      enum: ["Text", "Image", "Post"],
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    post: {
      postId: ObjectId,
      ref: "posts",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Message = model("messages", messageSchema);
