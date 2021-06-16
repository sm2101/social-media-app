const Post = require("../models/Posts"),
  User = require("../models/User");

exports.createPost = (req, res) => {
  const user = req.user._id;
  new Post({ ...req.body, user })
    .save()
    .then((result) => {
      res.json({
        status: "Success",
        message: "Post Created",
      });
    })
    .catch((err) => {
      res.json({
        status: "Error",
        err,
      });
    });
};
exports.getUserPosts = (req, res) => {
  const userId = req.params.id;
  Post.find({
    user: userId,
  })
    .select("-comments")
    .sort([["createdAt", -1]])
    .populate("user", "_id username image")
    .lean()
    .then((posts) => {
      res.json({
        status: "Success",
        message: "Posts Found",
        posts,
      });
    })
    .catch((err) => {
      res.json({
        status: "Error",
        err,
      });
    });
};
exports.getFollowersPost = (req, res) => {
  const user = req.user._id;
  User.findById(user)
    .select("following")
    .lean()
    .then((users) => {
      Post.find({
        $or: [
          {
            user: {
              $in: users.following,
            },
          },
          {
            user: user,
          },
        ],
      })
        .select("-comments")
        .sort([["createdAt", -1]])
        .populate("user", "_id username image")
        .then((posts) => {
          res.json({
            status: "Success",
            message: "Posts found",
            posts,
          });
          console.log(posts);
        })
        .catch((err) => {
          res.json({
            status: "Error",
            err,
          });
        });
    })
    .catch((err) => {
      res.json({
        status: "Error",
        err,
      });
    });
};

exports.getPost = (req, res) => {
  const postId = req.params.id;
  Post.findById(postId)
    .populate("user", "_id username image follower")
    .populate("comments.user", "_id username image")
    .populate("likes", "-password")
    .then((post) => {
      res.json({
        status: "Success",
        post,
      });
    })
    .catch((err) => {
      res.json({
        status: "Error",
        err,
      });
    });
};
exports.deletePost = (req, res) => {
  const postId = req.params.id;
  Post.findByIdAndDelete(postId)
    .then((response) => {
      res.json({
        status: "Success",
        message: "Post Deleted",
      });
    })
    .catch((err) => {
      res.json({
        status: "Error",
        err,
      });
    });
};
exports.updatePost = (req, res) => {
  const postId = req.params.id;
  const { caption } = req.body;
  Post.findByIdAndUpdate(postId, { caption })
    .then((post) => {
      res.json({
        status: "Success",
        post,
      });
    })
    .catch((err) => {
      res.json({
        status: "Error",
        err,
      });
    });
};
// likes

exports.likePost = (req, res) => {
  const postId = req.params.id;
  const user = req.user._id;

  Post.findByIdAndUpdate(postId, {
    $addToSet: {
      likes: user,
    },
  })
    .then((data) => {
      res.json({
        status: "Success",
        message: "Post liked",
      });
    })
    .catch((err) => {
      res.json({
        status: "Error",
        message: "Cannot like post, an error occured",
        err,
      });
    });
};

exports.unLikePost = (req, res) => {
  const postId = req.params.id;
  const user = req.user._id;

  Post.findByIdAndUpdate(postId, {
    $pull: {
      likes: user,
    },
  })
    .then((data) => {
      res.json({
        status: "Success",
        message: "Post unliked",
      });
    })
    .catch((err) => {
      res.json({
        status: "Error",
        message: "Cannot unlike post, an error occured",
        err,
      });
    });
};

// comments

exports.createComment = (req, res) => {
  const postId = req.params.id;
  const user = req.user._id;
  const comment = {
    user,
    text: req.body.text,
  };

  Post.findByIdAndUpdate(postId, {
    $addToSet: {
      comments: comment,
    },
  })
    .then((data) => {
      res.json({
        status: "Success",
        message: "Comment Created",
      });
    })
    .catch((err) => {
      res.json({
        status: "Error",
        err,
      });
    });
};

exports.deleteComment = (req, res) => {
  const postId = req.params.id;
  const cmtId = req.params.cmtId;
  Post.findById(postId)
    .then((post) => {
      if (
        post.comments.filter((comment) => comment._id.toString() === cmtId)
          .length === 0
      ) {
        return res.status(404).json({
          status: "Error",
          message: "Comment Doesnt Exist",
        });
      }
      const rIdx = post.comments
        .map((item) => item._id.toString())
        .indexOf(cmtId);
      post.comments.splice(rIdx, 1);
      post.save().then((post) => {
        res.json({
          status: "Success",
          message: "Comment Deleted",
        });
      });
    })
    .catch((err) => {
      res.json({
        status: "Error",
        err,
      });
    });
};

exports.getComments = (req, res) => {
  const postId = req.params.id;
  Post.findById(postId)
    .select("_id comments")
    .populate("comments.user")
    .then((comments) => {
      res.json({
        status: "Success",
        comments,
      });
    })
    .catch((err) => {
      res.json({
        status: "Error",
        err,
      });
    });
};
