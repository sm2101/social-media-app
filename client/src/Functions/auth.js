import axios from "axios";

export const loginUser = async (user) => {
  return await axios.post(`/api/user/login`, user);
};

export const registerUser = async (user) => {
  return await axios.post(`/api/user/register`, user);
};

export const getCurrentUser = async (token) => {
  return await axios.get(`/api/user`);
};
