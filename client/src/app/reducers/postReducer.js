import { SET_POST } from "../Actions/types";
const postReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_POST:
      return action.payload;
    default:
      return state;
  }
};

export default postReducer;
