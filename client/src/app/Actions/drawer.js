import { SET_VISIBLE } from "./types";

export const commentDrawer = (dispatch, payload) => {
  dispatch({
    type: SET_VISIBLE,
    payload,
  });
};
