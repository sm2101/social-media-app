import React, { useState } from "react";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import { followUser, unfollowUser } from "../../Functions/user";
import { isEmpty } from "../../Validators/Validators";
const UserListModal = ({ users, num, text, func, userId }) => {
  const [visible, setVisible] = useState(false);
  const handleOpen = () => {
    func();
    setVisible(true);
  };
  const follow = (id) => {
    followUser(id)
      .then((res) => {
        handleOpen();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unfollow = (id) => {
    const cnf = window.confirm("Unfollow User?");
    if (cnf) {
      unfollowUser(id)
        .then((res) => {
          handleOpen();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <div onClick={handleOpen}>
        <span>{num}</span>
        <br />
        {text}
      </div>
      <Modal
        visible={visible}
        title={text}
        footer={null}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <ul className="list-group-flush">
          {!isEmpty(users) &&
            users.map((user) => (
              <li
                className="list-group-item d-flex justify-content-between px-1"
                key={user._id}
              >
                <Link
                  to={`/user/${user._id}`}
                  onClick={() => setVisible(false)}
                >
                  <span className="user">
                    <img
                      className="userimage"
                      src={
                        !isEmpty(user.image)
                          ? user.image
                          : "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                      }
                      alt="user"
                    />
                    <span className="username">{user.username}</span>
                  </span>
                </Link>
                {user._id !== userId ? (
                  user.follower.includes(userId) ? (
                    <button
                      className="btn text-muted"
                      onClick={() => unfollow(user._id)}
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      className="btn text-muted"
                      onClick={() => follow(user._id)}
                    >
                      Follow
                    </button>
                  )
                ) : null}
              </li>
            ))}
        </ul>
      </Modal>
    </>
  );
};

export default UserListModal;
