import axios from "axios";

export const followUser = async (id) => {
  return await axios.put(`/api/user/follow/${id}`);
};
export const unfollowUser = async (id) => {
  return await axios.put(`/api/user/un-follow/${id}`);
};
export const getFollowers = async (id) => {
  return await axios.get(`/api/user/follower/${id}`);
};
export const getFollowing = async (id) => {
  return await axios.get(`/api/user/following/${id}`);
};
export const queryUser = async (q) => {
  return await axios.get(`/api/user/query?q=${q}`);
};
export const updateUser = async (usr) => {
  return await axios.put(`/api/user/update`, { usr });
};
