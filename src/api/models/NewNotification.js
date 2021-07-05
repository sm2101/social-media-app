const mongoose = require("mongoose"),
  { Schema, model } = mongoose,
  { ObjectId } = Schema;

const newNotifSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "users",
      required: true,
    },
    type: {
      type: String,
      enum: ["liked", "commented on", "followed"],
      required: true,
    },
    postId: {
      type: ObjectId,
      ref: "post",
    },
    recipentId: {
      type: ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = NewNotif = model("newNotif", newNotifSchema);
