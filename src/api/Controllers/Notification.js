const NewNotif = require("../models/NewNotification"),
  ReadNotif = require("../models/ReadNotification");

exports.migrateOne = (req, res) => {
  const notifId = req.body.id;

  NewNotif.findById(notifId)
    .then((notif) => {
      ReadNotif.insertMany([notif])
        .then((result) => {
          console.log("marked as read");
          NewNotif.deleteOne({ _id: notifId })
            .then((data) => {
              res.json({
                status: "Success",
                messag: "marked as read",
              });
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
    })
    .catch((err) => {
      res.json({
        status: "Error",
        err,
      });
    });
};
exports.migrateAll = (req, res) => {
  const userId = req.user._id;

  NewNotif.find({ recipentId: userId })
    .then((notifs) => {
      ReadNotif.insertMany(notifs)
        .then((result) => {
          NewNotif.deleteMany({ recipentId: userId })
            .then((data) => {
              res.json({
                status: "Success",
                messag: "marked as read",
              });
            })
            .catch((err) => {
              res.json({
                status: "Error",
                message: "1",
                err,
              });
            });
        })
        .catch((err) => {
          res.json({
            status: "Error",
            message: "2",
            err,
          });
        });
    })
    .catch((err) => {
      res.json({
        status: "Error",
        message: "3",
        err,
      });
    });
};

exports.getNotifications = (req, res) => {
  const recipentId = req.user._id;

  NewNotif.find({ recipentId })
    .populate("user", "_id username image")
    .sort([["createdAt", -1]])
    .then((newNotifs) => {
      ReadNotif.find({ recipentId })
        .populate("user", "_id username image")
        .sort([["createdAt", -1]])
        .then((readNotifs) => {
          console.log("Success", newNotifs, readNotifs);
          res.json({
            status: "Success",
            newNotifs,
            readNotifs,
          });
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
