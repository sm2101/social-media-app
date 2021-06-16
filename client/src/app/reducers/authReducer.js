import { isEmpty } from "../../Validators/Validators";
import { SET_CURRENT_USER } from "../Actions/types";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
let initialState = {
  isAuthenticated: false,
  user: {},
};
if (Cookies.get("jwt")) {
  initialState = {
    ...initialState,
    isAuthenticated: !isEmpty(Cookies.get("jwt")),
    user: jwt_decode(Cookies.get("jwt")),
  };
}
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
