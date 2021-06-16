const express = require("express"),
  router = express.Router(),
  passport = require("passport");

const {
  loginUser,
  registerUser,
  getUser,
  findUser,
  followUser,
  unFollowUser,
  getAllUsers,
  getFollowers,
  getFollowing,
  updateUser,
} = require("../Controllers/User");
// public routes
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/query", findUser);
router.get("/all", getAllUsers);
router.get("/follower/:id", getFollowers);
router.get("/following/:id", getFollowing);
// protected route
router.get("/", passport.authenticate("jwt", { session: false }), getUser);
router.put(
  "/follow/:id",
  passport.authenticate("jwt", { session: false }),
  followUser
);
router.put(
  "/un-follow/:id",
  passport.authenticate("jwt", { session: false }),
  unFollowUser
);
router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  updateUser
);
module.exports = router;
