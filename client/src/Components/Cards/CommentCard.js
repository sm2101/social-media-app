import React from "react";
import { Avatar } from "antd";
const CommentCard = ({ del, comment, user }) => {
  return (
    <div className="comment-card">
      <div className="row">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <span className="user">
            <span className="userimg">
              {comment && comment.user && comment.user.image.length > 0 ? (
                <Avatar src={comment.user.image} />
              ) : (
                <Avatar>{comment.user.username[0].toUpperCase()}</Avatar>
              )}
            </span>
            <span className="username">{comment.user.username}</span>
          </span>
          <small className="text-muted">
            {new Date(comment.date).toLocaleString("en-IN", {
              dateStyle: "medium",
            })}
            {user.user.id === comment.user._id ? (
              <button
                className="btn text-danger"
                onClick={() => del(comment._id)}
              >
                <i className="far fa-trash-alt"></i>
              </button>
            ) : null}
          </small>
        </div>
        <div className="col-12 mt-2">{comment.text}</div>
      </div>
    </div>
  );
};

export default CommentCard;
