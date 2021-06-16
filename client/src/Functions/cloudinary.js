import axios from "axios";

export const uploadImage = async (img) => {
  return await axios.post(`/api/cloudinary/upload`, { img });
};

export const deleteImage = async (public_id) => {
  return await axios.post(`/api/cloudinary/remove`, { public_id });
};
