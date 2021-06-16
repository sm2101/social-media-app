import { SET_POST } from "./types";

export const setPost = (dispatch, payload) => {
  dispatch({
    type: SET_POST,
    payload,
  });
};
