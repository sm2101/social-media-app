const mongoose = require("mongoose"),
  { Schema, model } = mongoose,
  { ObjectId } = Schema;

const profileSchema = new Schema(
  {
    bio: {
      type: String,
    },
    house: {
      type: String,
      enum: ["Gryffindor", "Ravenclaw", "Hufflepuff", "Slytherin"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
    },
    user: {
      type: ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Profile = model("profile", profileSchema);
