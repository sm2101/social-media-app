import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  likePost,
  unLikePost,
  createComment,
  deleteComment,
  getPost,
  deletePost,
} from "../../Functions/posts";
import { deleteImage } from "../../Functions/cloudinary";
import { isEmpty } from "../../Validators/Validators";
import EditPostModal from "../Modals/EditPostModal";
import { Avatar, message, Popconfirm } from "antd";
import { toast } from "react-toastify";
import { followUser } from "../../Functions/user";
import CommentCard from "../Cards/CommentCard";
import renderHTML from "react-render-html";
const PostPage = ({ match, history }) => {
  const [post, setPost] = useState([]),
    [isOwwner, setIsOwner] = useState(false),
    [doesFollow, setDoesFollow] = useState(false),
    [liked, setLiked] = useState(false),
    [comments, setComments] = useState([]),
    [likes, setLikes] = useState(0),
    [text, setText] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const currentPost = () => {
    const id = match.params.id;
    getPost(id)
      .then((res) => {
        setPost(res.data.post);
        for (let i = 0; i < res.data.post.likes.length; i++) {
          if (res.data.post.likes[i]._id === user.user.id) {
            setLiked(true);
            break;
          } else {
            setLiked(false);
          }
        }
        setLikes(res.data.post.likes.length);
        setComments(res.data.post.comments);
        if (user.isAuthenticated) {
          if (res.data.post.user._id === user.user.id) {
            setIsOwner(true);
          } else {
            if (res.data.post.user.follower.includes(user.user.id)) {
              setDoesFollow(true);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const follow = (id) => {
    followUser(id)
      .then((res) => {
        // setDoesFollow(true);
        currentPost();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const like = () => {
    likePost(post._id)
      .then((res) => {
        // setLiked(true);
        // setLikes(likes + 1);
        currentPost();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const unLike = () => {
    unLikePost(post._id)
      .then((res) => {
        // setLiked(false);
        // setLikes(likes - 1);
        currentPost();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const comment = () => {
    createComment(post._id, { text })
      .then((res) => {
        setText("");
        currentPost();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const del = (cmtId) => {
    const id = post._id;
    const cnf = window.confirm("Delte the Comment?");
    if (cnf) {
      deleteComment(id, cmtId)
        .then((res) => {
          currentPost();
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  };
  const delPost = () => {
    deleteImage(post.imageId).then((res) => {
      deletePost(post._id).then((res) => {
        message.success({ content: "Post deleted" });
        history.push("/dashboard");
      });
    });
  };
  const showUser = () => {
    const id = post.user._id;
    history.push(`/user/${id}`);
  };
  useEffect(() => {
    currentPost();
  }, []);
  return (
    <div className="postpage">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-12 col-lg-8">
            <div className="row">
              <span className="post-user col pointer" onClick={showUser}>
                {post && post.user && post.user.image.length > 0 ? (
                  <Avatar
                    src={post && post.user && post.user.image}
                    size={60}
                  />
                ) : (
                  <Avatar size={60}>
                    {post && post.user && post.user.username[0].toUpperCase()}
                  </Avatar>
                )}
                <span className="post-username">
                  {post.user && post.user.username}
                </span>
              </span>
              {/* {JSON.stringify(post.user)} */}
              <span className="post-header-btn col">
                {user.isAuthenticated && isOwwner ? (
                  <>
                    <EditPostModal
                      id={!isEmpty(post) ? post._id : ""}
                      cap={!isEmpty(post) ? post.caption : ""}
                      image={
                        !isEmpty(post) && !isEmpty(post.images)
                          ? post.images
                          : ""
                      }
                      func={currentPost}
                    />
                    <Popconfirm
                      title="Delete the post?"
                      onConfirm={delPost}
                      okText="Delete"
                    >
                      <button className="btn text-danger">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </Popconfirm>
                  </>
                ) : null}
                {user.isAuthenticated && !doesFollow && !isOwwner ? (
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => follow(post.user._id)}
                  >
                    <i className="fas fa-plus"></i> Follow
                  </button>
                ) : null}
              </span>
            </div>
            <div className="row" style={{ padding: "0 0.5rem 0 0.5rem" }}>
              <div className="post-page-img p-0 mt-3">
                <img
                  src={
                    post.images && post.images.length > 0 ? post.images : null
                  }
                  alt="post"
                />
                <div className="post-body">
                  <div className="like-counter text-danger pointer">
                    {liked ? (
                      <i className="fas fa-heart" onClick={unLike}></i>
                    ) : (
                      <i className="far fa-heart" onClick={like}></i>
                    )}
                    <span>{likes} likes</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row post-caption">
              {post.caption && post.caption.length > 0
                ? renderHTML(post.caption)
                : null}
            </div>
            <div className="row post-comments m-0">
              <div className="col-12 comment-card">
                <div className="row m-0">
                  <div className="col-12 d-flex justify-content-between align-items-center">
                    <span className="user">
                      <span className="userimg">
                        {user.isAuthenticated && user.user.image.length > 0 ? (
                          <Avatar src={user.user.image} />
                        ) : (
                          <Avatar>{user.user.name[0].toUpperCase()}</Avatar>
                        )}
                      </span>
                      <span className="username">{user.user.name}</span>
                    </span>
                    <small className="text-muted">
                      {new Date().toLocaleString("en-IN", {
                        dateStyle: "medium",
                      })}
                    </small>
                  </div>
                  <div className="col-12 mt-3">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="comment"
                        placeholder="Your comment"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />
                      <button
                        className="btn text-muted"
                        onClick={comment}
                        style={{ fontSize: "large" }}
                      >
                        <i className="fas fa-chevron-circle-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 comments">
                {comments && comments.length > 0 ? (
                  comments.map((comment) => (
                    <CommentCard
                      comment={comment}
                      user={user}
                      del={del}
                      key={comment._id}
                    />
                  ))
                ) : (
                  <div className="d-flex w-100 justify-content-center mt-2">
                    <small className="text-muted">Such Empty, Much Wow</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
