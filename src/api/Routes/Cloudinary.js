const express = require("express"),
  router = express.Router(),
  passport = require("passport");

const { upload, remove } = require("../Controllers/Cloudinary");
const { route } = require("./Posts");

// private routes
router.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  upload
);
router.post(
  "/remove",
  passport.authenticate("jwt", { session: false }),
  remove
);

module.exports = router;
