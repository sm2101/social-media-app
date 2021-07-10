import React, { useState, useEffect } from "react";
import { Link, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../app/Actions/auth";
import Cookies from "js-cookie";
import { Avatar, message } from "antd";
import { getNotif } from "../../Functions/notif";
import CreatePostModal from "../Modals/CreatePostModal";
import SearchModal from "../Modals/SearchModal";
import { socket } from "../../Functions/socket";
import Notifications from "../Popovers/Notifications";
const Nav = () => {
  const [newNotif, setNewNotif] = useState([]),
    [readNotif, setReadNotif] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => ({ ...state }));
  const logout = () => {
    setUser(dispatch, {});
    Cookies.remove("jwt");
    message.success({ content: "Logged out" });
    history.push("/");
  };

  const getNotifications = () => {
    getNotif().then((res) => {
      setNewNotif(res.data.newNotifs);
      setReadNotif(res.data.readNotifs);
    });
  };
  socket &&
    socket.on("newNotif", () => {
      console.log("New Notifications");
      getNotifications();
    });
  useEffect(() => {
    getNotifications();
  }, []);
  return (
    <>
      <div className="Nav">
        <div className="container h-100">
          <div className="row h-100 align-items-center justify-content-between">
            <div className="col-2">
              <span className="logo">
                <Link to="/">
                  <h1 className="display-4 mb-0">Name</h1>
                </Link>
              </span>
            </div>
            <div className="col-2 col-lg-4">
              <span className="navigation d-flex justify-content-end align-items-center">
                {user.isAuthenticated ? (
                  <>
                    <span className="align-items-center navlinks d-none d-md-flex">
                      <NavLink to="/">
                        <i className="fas fa-home"></i>
                      </NavLink>
                      <CreatePostModal />
                      <SearchModal />
                      <Notifications
                        newNotif={newNotif}
                        readNotif={readNotif}
                        getNotifications={getNotifications}
                      />
                    </span>
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn dropdown-toggle d-flex align-items-center"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span className="username">{user.user.name}</span>
                        <span className="userimage">
                          {user.user.image.length > 0 ? (
                            <Avatar src={user.user.image} />
                          ) : (
                            <Avatar>{user.user.name[0].toUpperCase()}</Avatar>
                          )}
                        </span>
                      </button>
                      <div className="dropdown-menu">
                        <Link
                          className="dropdown-item text-muted text-center pointer"
                          to={`/user/${user.user.id}`}
                        >
                          <i className="fas fa-user"></i> Profile
                        </Link>
                        <div className="dropdown-divider"></div>
                        <span
                          className="dropdown-item text-danger text-center pointer"
                          onClick={() => logout()}
                        >
                          <i className="fas fa-power-off"></i> Logout
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      {user.isAuthenticated ? (
        <div className="mobile-nav d-block d-md-none">
          <div className="container-fluid">
            <div className="row justify-content-around">
              <div className="col d-flex justify-content-center align-items-center">
                <NavLink to="/">
                  <i className="fas fa-home"></i>
                </NavLink>
              </div>
              <div className="col d-flex justify-content-center align-items-center">
                <CreatePostModal />
              </div>
              <div className="col d-flex justify-content-center align-items-center">
                <Notifications
                  newNotif={newNotif}
                  readNotif={readNotif}
                  getNotifications={getNotifications}
                  placement="topRight"
                />
              </div>
              <div className="col d-flex justify-content-center align-items-center">
                <SearchModal />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Nav;
