import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import Cookies from "js-cookie";
import { setUser } from "../../app/Actions/auth";
export default function UserRoute({ children, ...rest }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const checkUser = () => {
    const exp = user.user.exp;
    if (Date.now() >= exp * 1000) {
      user.isAuthenticated = false;
      user.user = {};
      Cookies.remove("jwt");
      setUser(dispatch, user.user);
    }
  };
  useEffect(() => {
    checkUser();

    return () => checkUser();
  }, []);
  return user.isAuthenticated && user.user ? (
    <Route {...rest} />
  ) : (
    <LoadingToRedirect destination="/login" />
  );
}
