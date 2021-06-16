import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCurrentProfile } from "../../Functions/profile";
import { getUserPosts } from "../../Functions/posts";
import { Avatar } from "antd";
import {
  followUser,
  unfollowUser,
  getFollowing,
  getFollowers,
} from "../../Functions/user";
import { isEmpty } from "../../Validators/Validators";
import PostCards from "../Cards/PostCards";
import UserListModal from "../Modals/UserListModal";
import { Link } from "react-router-dom";
const UserPage = ({ match }) => {
  const [profile, setProfile] = useState(""),
    [usr, setUsr] = useState(""),
    [isOwner, setIsOwner] = useState(false),
    [isFollowing, setIsFollowing] = useState(false),
    [follower, setFollower] = useState(0),
    [following, setFollowing] = useState(0),
    [posts, setPosts] = useState([]),
    [followAcc, setFollowAcc] = useState([]),
    [followingAcc, setFollowingAcc] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  const getData = (id) => {
    getCurrentProfile(id).then((res) => {
      setProfile(res.data.data);
      setUsr(res.data.data.user);
      console.log(res.data.data.user.username);
      setIsOwner(user.user.id === res.data.data.user._id);
      setIsFollowing(res.data.data.user.follower.includes(user.user.id));
      setFollower(res.data.data.user.follower.length);
      setFollowing(res.data.data.user.following.length);
    });
  };
  const follow = () => {
    const id = usr._id;
    followUser(id)
      .then((res) => {
        getData(match.params.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unfollow = () => {
    const cnf = window.confirm("Unfollow User?");
    if (cnf) {
      const id = usr._id;
      unfollowUser(id)
        .then((res) => {
          getData(match.params.id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const followers = () => {
    const id = usr._id;
    getFollowers(id)
      .then((res) => {
        setFollowAcc(res.data.followers.follower);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const followingAccounts = () => {
    const id = usr._id;
    getFollowing(id)
      .then((res) => {
        setFollowingAcc(res.data.following.following);
        console.log(res.data.following.following);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const id = match.params.id;
    getData(id);
    getUserPosts(id).then((posts) => {
      console.log(id);
      setPosts(posts.data.posts);
    });
  }, [match.params.id]);
  return (
    <div className="userpage">
      <div className="container h-100">
        <div className="row user-info m-0">
          <div className=" col-12 col-md-4 col-lg-3 d-flex align-items-start justify-content-center fixed">
            <div className="row w-100">
              <div className="col-12">
                <div className="user-card">
                  <div className="user-house">
                    <div
                      className={`user-img border-${
                        !isEmpty(profile) ? profile.house : ""
                      }`}
                    >
                      {!isEmpty(usr) && usr.image.length > 0 ? (
                        <Avatar src={usr.image} size={150} />
                      ) : (
                        <Avatar size={150}>
                          <span style={{ fontSize: "xxx-large" }}>
                            {!isEmpty(usr) && usr.username[0].toUpperCase()}
                          </span>
                        </Avatar>
                      )}
                    </div>
                    <div
                      className={`house-badge badge-${
                        !isEmpty(profile) ? profile.house : ""
                      }`}
                    ></div>
                  </div>
                  <div className="user-name">
                    {!isEmpty(profile) ? profile.name : ""}
                    <span className="text-muted">{` (${
                      !isEmpty(usr) ? usr.username : ""
                    })`}</span>
                  </div>
                  <div className="bio">
                    {!isEmpty(profile) ? profile.bio : ""}
                  </div>
                  {isOwner ? (
                    <Link
                      className="btn form-control text-muted"
                      to={`/update-profile/${usr._id}`}
                    >
                      <i className="fas fa-pen"></i> Edit Profile
                    </Link>
                  ) : isFollowing ? (
                    <div
                      className="btn form-control text-muted"
                      onClick={unfollow}
                    >
                      <i className="fas fa-user-check"></i> Following
                    </div>
                  ) : (
                    <div
                      className="btn form-control text-muted"
                      onClick={follow}
                    >
                      <i className="fas fa-user-plus"></i> Follow
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="follow-count">
                  <div className="row">
                    <div className="col-6 pointer" onClick={followers}>
                      <UserListModal
                        users={followAcc}
                        num={follower}
                        func={followers}
                        text="Followers"
                        userId={user.user.id}
                      />
                    </div>
                    <div className="col-6 pointer" onClick={followingAccounts}>
                      <UserListModal
                        users={followingAcc}
                        num={following}
                        func={followingAccounts}
                        text="Following"
                        userId={user.user.id}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-8 d-flex align-items-start justify-content-center offset-md-4">
            <div className="row w-100 d-flex justify-content-center">
              {!isEmpty(posts) &&
                posts.map((post) => (
                  <PostCards post={post} key={post._id} user={user} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
