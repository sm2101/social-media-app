const express = require("express"),
  router = express.Router(),
  passport = require("passport");

const {
  createConversation,
  getUserConversations,
} = require("../Controllers/Conversation");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getUserConversations
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createConversation
);

module.exports = router;
