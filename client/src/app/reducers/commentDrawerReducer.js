import { SET_VISIBLE } from "../Actions/types";
const commentDrawerReducer = (state = false, action) => {
  switch (action.type) {
    case SET_VISIBLE:
      return action.payload;
    default:
      return state;
  }
};

export default commentDrawerReducer;
