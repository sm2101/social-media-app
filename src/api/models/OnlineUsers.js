const mongoose = require("mongoose"),
  { Schema, model } = mongoose,
  { ObjectId } = Schema;

const onlineUserSchema = new Schema({
  user: {
    type: ObjectId,
    required: true,
  },
  socketId: {
    type: String,
    required: true,
  },
});
module.exports = OnlineUser = model("onlineUser", onlineUserSchema);
