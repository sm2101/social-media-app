const OnlineUser = require("../api/models/OnlineUsers"),
  User = require("../api/models/User");
module.exports = function (socket) {
  socket.on("newUser", (args) => {
    OnlineUser.findOne({ user: args })
      .then((result) => {
        if (result) {
          result.socketId = socket.id;
          result.save().then((res) => {
            console.log("socket id updated");
          });
        } else {
          new OnlineUser({
            user: args,
            socketId: socket.id,
          })
            .save()
            .then((res) => {
              User.findByIdAndUpdate(
                args,
                { online: true },
                { new: true }
              ).then((res) => {
                console.log("User status updated");
              });
              console.log("new online user created");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  socket.on("disconnect", () => {
    console.log(socket.id);
    OnlineUser.findOneAndDelete({ socketId: socket.id })
      .then((res) => {
        console.log(res);
        if (res) {
          User.findByIdAndUpdate(res.user, {
            online: false,
            lastActive: Date.now(),
          })
            .then((res) => {
              console.log("user status updated");
            })
            .catch((err) => {
              console.error("error", err);
            });
        }
        console.log("user disconnected");
      })
      .catch((err) => {
        console.error(err);
      });
  });
};
