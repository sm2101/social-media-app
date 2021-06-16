const express = require("express"),
  router = express.Router(),
  passoprt = require("passport");
const {
  getProfile,
  createProfile,
  updateProfile,
} = require("../Controllers/profile");
// public routes
router.get("/:id", getProfile);

// protected routes
router.post(
  "/create",
  passoprt.authenticate("jwt", { session: false }),
  createProfile
);
router.post(
  "/update/:id",
  passoprt.authenticate("jwt", { session: false }),
  updateProfile
);

module.exports = router;
