const mongoose = require("mongoose"),
  { Schema, model } = mongoose,
  { ObjectId } = Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    imageId: {
      type: String,
    },
    follower: [
      {
        type: ObjectId,
        ref: "users",
      },
    ],
    following: [
      {
        type: ObjectId,
        ref: "users",
      },
    ],
    online: {
      type: Boolean,
    },
    lastActive: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User = model("users", UserSchema);
