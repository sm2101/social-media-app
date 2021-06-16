import axios from "axios";

export const getPosts = async () => {
  return await axios.get("/api/post/");
};

export const createPost = async (post) => {
  return await axios.post("/api/post/", post);
};

export const likePost = async (id) => {
  return await axios.put(`/api/post/like/${id}`);
};
export const unLikePost = async (id) => {
  return await axios.put(`/api/post/unlike/${id}`);
};

export const getPost = async (id) => {
  return await axios.get(`/api/post/${id}`);
};

export const createComment = async (id, comment) => {
  return await axios.put(`/api/post/comment/${id}`, comment);
};

export const deleteComment = async (id, cmtId) => {
  return await axios.put(`/api/post/del-comment/${id}/${cmtId}`);
};

export const getComments = async (id) => {
  return await axios.get(`/api/post/comments/${id}`);
};

export const getUserPosts = async (id) => {
  return await axios.get(`/api/post/user/${id}`);
};

export const updatePost = async (id, caption) => {
  return await axios.put(`/api/post/${id}`, { caption });
};
export const deletePost = async (id) => {
  return await axios.delete(`/api/post/${id}`);
};
