const express = require("express"),
  router = express.Router(),
  passport = require("passport");

const {
  getNotifications,
  migrateOne,
  migrateAll,
} = require("../Controllers/Notification");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getNotifications
);
router.get(
  "/migrate/all",
  passport.authenticate("jwt", { session: false }),
  migrateAll
);

module.exports = router;
