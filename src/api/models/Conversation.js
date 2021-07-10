const mongoose = require("mongoose"),
  { Schema, model } = mongoose,
  { ObjectId } = Schema;

const convoSchema = new Schema(
  {
    members: [
      {
        type: ObjectId,
        ref: "users",
      },
    ],
    name: {
      type: String,
    },
    lastMessage: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Convo = model("convo", convoSchema);
