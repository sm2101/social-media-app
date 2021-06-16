import axios from "axios";

export const createProfile = async (profile) => {
  return await axios.post(`/api/profile/create`, profile);
};

export const getCurrentProfile = async (id) => {
  return await axios.get(`/api/profile/${id}`);
};

export const updateProfile = async (id, profile) => {
  return await axios.post(`/api/profile/update/${id}`, profile);
};
