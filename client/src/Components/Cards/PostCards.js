/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Avatar } from "antd";
import { likePost, unLikePost, getComments } from "../../Functions/posts";
import { setPost } from "../../app/Actions/post";
import { commentDrawer } from "../../app/Actions/drawer";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import renderHTML from "react-render-html";
const PostCards = ({ post, user }) => {
  const [liked, setLiked] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const like = () => {
    likePost(post._id)
      .then((res) => {
        setLiked(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const unLike = () => {
    unLikePost(post._id)
      .then((res) => {
        setLiked(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const showUser = () => {
    const id = post.user._id;
    history.push(`/user/${id}`);
  };
  const showpost = () => {
    history.push(`/post/${post._id}`);
  };
  const showComments = async () => {
    getComments(post._id).then((res) => {
      setPost(dispatch, res.data.comments);
      commentDrawer(dispatch, true);
    });
  };
  useEffect(() => {
    setLiked(post.likes.includes(user.user.id));
  }, [post, post.likes, user.user.id]);
  return (
    <div className="postcard">
      <div className="row">
        <div className="col-10">
          <div className="post-card-user">
            <span onClick={showUser}>
              <span className="userimg">
                {post.user.image.length > 0 ? (
                  <Avatar src={post.user.image} size="sm" />
                ) : (
                  <Avatar>{post.user.username[0].toUpperCase()}</Avatar>
                )}
              </span>
              <span className="username">{post.user.username}</span>
            </span>
          </div>
        </div>
        <div className="col-2 d-flex justify-content-center align-items-center">
          <div className="btn-group"></div>
          <button
            className="btn text-muted"
            data-toggle="dropdown"
            aria-haspopup="false"
            aria-expanded="false"
          >
            <i className="fas fa-ellipsis-h"></i>
          </button>
          <div className="dropdown-menu">
            <span className="dropdown-item">
              <a
                href={post.images && post.images.length > 0 ? post.images : ""}
                download="image.jpg"
                type="image/jpeg"
              >
                Download Image
              </a>
            </span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 card-caption-cont">
          <p className="mb-0">{renderHTML(post.caption)}</p>
        </div>
      </div>
      {post.images && post.images.length > 0 ? (
        <div className="post-img">
          <img src={post.images} alt="post" />
          <div className="post-img-overlay pointer" onClick={showpost}>
            <i
              className="fas fa-expand-arrows-alt"
              style={{ marginRight: "10px" }}
            ></i>
            See Post
          </div>
        </div>
      ) : null}
      <div className="row">
        <div className="col-6">
          <div className="post-actions">
            <div className="like text-danger pointer">
              {liked ? (
                <i className="fas fa-heart" onClick={unLike}></i>
              ) : (
                <i className="far fa-heart" onClick={like}></i>
              )}
            </div>
            <div
              className="see-post text-secondary pointer"
              onClick={showComments}
            >
              <i className="far fa-comment-dots"></i>
            </div>
          </div>
        </div>
        <div className="col-6 like-count">
          <span className="text-muted">
            {post &&
              post.createdAt &&
              new Date(post.createdAt).toLocaleString("en-IN", {
                dateStyle: "medium",
              })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCards;
