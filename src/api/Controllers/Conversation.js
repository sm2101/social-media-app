const Convo = require("../models/Conversation");

exports.createConversation = (req, res) => {
  const id = req.user._id;
  const { members } = req.body;

  Convo.find({
    members: {
      $in: [id, ...members],
    },
  })
    .then((convo) => {
      if (!convo) {
        new Convo({
          members: [...members, id],
        })
          .save()
          .then((result) => {
            res.json({
              status: "Success",
              newConvo: true,
              message: "Conversation created",
            });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({
              status: "Error",
              err,
            });
          });
      } else {
        res.json({
          status: "Success",
          newConvo: false,
          message: "Conversation already Exists",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        status: "Error",
        err,
      });
    });
};

exports.getUserConversations = (req, res) => {
  const id = req.user._id;
  Convo.find({
    members: {
      $in: [id],
    },
  })
    .sort([["lastMessage", -1]])
    .lean()
    .then((convos) => {
      res.json({
        status: "Success",
        convos,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "Error",
        err,
      });
    });
};
