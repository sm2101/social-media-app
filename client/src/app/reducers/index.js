import { combineReducers } from "redux";
import authReducer from "./authReducer";
import commentDrawerReducer from "./commentDrawerReducer";
import postReducer from "./postReducer";
export const rootReducer = combineReducers({
  user: authReducer,
  cmtDrawer: commentDrawerReducer,
  post: postReducer,
});
