import React, { useState } from "react";
import { Drawer, Grid } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { commentDrawer } from "../../app/Actions/drawer";
import CommentCard from "../Cards/CommentCard";
import { setPost } from "../../app/Actions/post";
import emptyImg from "../../Images/pngwing.com.png";
import { Avatar } from "antd";
import {
  createComment,
  deleteComment,
  getComments,
} from "../../Functions/posts";
const { useBreakpoint } = Grid;
const CommentDrawer = () => {
  const { md } = useBreakpoint();
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { cmtDrawer, user, post } = useSelector((state) => ({ ...state }));
  const closeDrawer = () => {
    commentDrawer(dispatch, false);
    setPost(dispatch, {});
  };
  const del = (cmtId) => {
    const id = post._id;
    const cnf = window.confirm("Delte the Comment?");
    if (cnf) {
      deleteComment(id, cmtId)
        .then((res) => {
          getComments(post._id).then((res) => {
            setPost(dispatch, res.data.comments);
          });
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  };
  const comment = () => {
    createComment(post._id, { text })
      .then((res) => {
        setText("");
        getComments(post._id).then((res) => {
          setPost(dispatch, res.data.comments);
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  return (
    <Drawer
      title="Comments"
      placement={!md ? "bottom" : "right"}
      visible={cmtDrawer}
      onClose={closeDrawer}
      width={!md ? "100%" : "40%"}
      height={!md ? "75%" : "100%"}
      footer={
        <div className="col-12 comment-card">
          <div className="row m-0">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <span className="user">
                <span className="userimg">
                  {user.isAuthenticated && user.user.image.length > 0 ? (
                    <Avatar src={user.isAuthenticated && user.user.image} />
                  ) : (
                    <Avatar>
                      {user.isAuthenticated && user.user.name[0].toUpperCase()}
                    </Avatar>
                  )}
                </span>
                <span className="username">
                  {user.isAuthenticated && user.user.name}
                </span>
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
                  disabled={text.length === 0}
                  onClick={comment}
                  style={{ fontSize: "large" }}
                >
                  <i className="fas fa-chevron-circle-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="col-12 comments">
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <CommentCard
              comment={comment}
              user={user}
              del={del}
              key={comment._id}
            />
          ))
        ) : (
          <div className="w-100 mt-2">
            <img
              src={emptyImg}
              alt=""
              style={{
                width: "80px",
                filter: "grayscale(100%)",
              }}
              className="center-x"
            />
            <small className="text-muted d-block text-center mt-2">
              Such Empty, Much Wow
            </small>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default CommentDrawer;
