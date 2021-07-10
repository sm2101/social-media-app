import { io } from "socket.io-client";

export let socket = null;

export const connectSocket = () => {
  socket = io();
};

export const addUser = (userId) => {
  console.log(socket.connected);
  socket.emit("newUser", userId);
};
