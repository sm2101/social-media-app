const express = require("express"),
  router = express.Router(),
  passport = require("passport");

const {
  createPost,
  getFollowersPost,
  likePost,
  unLikePost,
  createComment,
  deleteComment,
  getPost,
  getComments,
  getUserPosts,
  updatePost,
  deletePost,
} = require("../Controllers/Posts");
// Public Routes
router.get("/:id", getPost);

// protected routes
router.post("/", passport.authenticate("jwt", { session: false }), createPost);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getFollowersPost
);
router.get(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  getUserPosts
);
router.get(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  getComments
);

router.put(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  likePost
);
router.put(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  unLikePost
);
router.put(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  createComment
);
router.put(
  "/del-comment/:id/:cmtId",
  passport.authenticate("jwt", { session: false }),
  deleteComment
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updatePost
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deletePost
);
module.exports = router;
