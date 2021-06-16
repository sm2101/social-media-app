import React, { useState } from "react";
import { queryUser } from "../../Functions/user";
import { useHistory } from "react-router-dom";
import { Avatar } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const SearchModal = () => {
  const [visible, setVisible] = useState(false),
    [users, setUsers] = useState([]),
    [query, setQuery] = useState(""),
    [loading, setLoading] = useState(false),
    [feedback, setFeedback] = useState("Search for users");
  const history = useHistory();
  const onClose = () => {
    setUsers([]);
    setQuery("");
    setVisible(false);
  };
  const findUsers = () => {
    setLoading(true);
    queryUser(query)
      .then((res) => {
        setUsers(res.data.users);
        setFeedback("No users Found, please try changing the keyword");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const showUser = (id) => {
    history.push(`/user/${id}`);
    onClose();
  };
  return (
    <>
      <button className="btn btn-outline" onClick={() => setVisible(true)}>
        <i className="fas fa-search"></i>
      </button>
      <div
        className={`search-overlay ${visible ? "search-overlay-visible" : ""}`}
      >
        <button className="btn close-btn mt-5 mt-md-0" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <div className="container pt-5 pt-md-0">
          <div className="row justify-content-center pt-5">
            <div className="col-md-8">
              <div className="inputGroup">
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  className="btn search-btn"
                  onClick={findUsers}
                  disabled={loading}
                >
                  {loading ? (
                    <LoadingOutlined />
                  ) : (
                    <i className="fas fa-search"></i>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {loading ? null : (
              <div className="col-md-8">
                {users.length > 0 ? (
                  users.map((user) => (
                    <div
                      className="search-user-card pointer"
                      key={user._id}
                      onClick={(_) => showUser(user._id)}
                    >
                      <div className="post-card-user">
                        <span className="userimg">
                          {user && user.image.length > 0 ? (
                            <Avatar src={user.image} size={50} />
                          ) : (
                            <Avatar size={50}>
                              {user.username[0].toUpperCase()}
                            </Avatar>
                          )}
                        </span>
                        <span className="username">{user.username}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-8 mt-4 d-flex justify-content-center align-items-center ">
                    {`${feedback}`}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
