import { SET_CURRENT_USER } from "./types";
export const setUser = (dispatch, user) => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: user,
  });
};
