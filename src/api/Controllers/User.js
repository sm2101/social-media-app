const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginUser = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(404).json({
        status: "Request Success",
        message: "User Not Found",
      });
    } else {
      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: user._id,
            name: user.username,
            email: user.email,
            image: user.image,
            imageId: user.imageId,
            follower: user.follower,
            following: user.following,
          };

          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 7200 },
            (err, token) => {
              if (err) {
                throw err;
              } else {
                res.cookie("jwt", token, {
                  secure: true,
                });
                res.status(200).json({
                  status: "Success",
                  message: "User Found",
                  token: `${token}`,
                });
              }
            }
          );
        } else {
          return res.status(401).json({
            status: "Unauthorised",
            message: "Passwords don't match",
          });
        }
      });
    }
  });
};

exports.registerUser = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({
        status: "Error",
        message: "User already Exists",
      });
    } else {
      console.log(req.body);
      const newUsr = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        image: req.body.image || "",
        imageId: "",
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUsr.password, salt, (err, hash) => {
          if (err) {
            throw err;
          } else {
            newUsr.password = hash;
            newUsr
              .save()
              .then((result) => {
                res.json({
                  status: "Success",
                  message: "UserCreated",
                  usr: result,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  status: "Fail",
                  message: "Some error Occured",
                  err,
                });
              });
          }
        });
      });
    }
  });
};
exports.getAllUsers = (req, res) => {
  User.find({})
    .populate(
      "follower",
      "-follower -following -password -createdAt -updatedAt -__v -email"
    )
    .populate(
      "following",
      "-follower -following -password -createdAt -updatedAt -__v -email"
    )
    .then((data) => {
      res.json({
        data,
      });
    });
};
exports.getUser = (req, res) => {
  if (req.user) {
    res.json({
      status: "Success",
      message: "User Logged in",
      user: req.user,
    });
  } else {
    res.status(400).json({
      status: "Fail",
      message: "User Not logged in",
    });
  }
};

exports.findUser = (req, res) => {
  const { q } = req.query;
  User.find({
    $or: [
      {
        username: {
          $regex: `${q}`,
          $options: "i",
        },
      },
      {
        email: {
          $regex: `${q}`,
          $options: "i",
        },
      },
    ],
  })
    .select("-password -__v -createdAt -updatedAt")
    .then((users) => {
      if (!users) {
        res.status(404).json({
          status: "Fail",
          message: "No users found",
        });
      } else {
        res.json({
          status: "Success",
          message: "Users found",
          users,
        });
      }
    })
    .catch((err) => {
      res.json({
        status: "Error",
        message: "Some error occured",
        err,
      });
    });
};

exports.followUser = (req, res) => {
  const followerId = req.user._id;
  const followingId = req.params.id;

  User.findByIdAndUpdate(followingId, {
    $addToSet: {
      follower: followerId,
    },
  })
    .then((result) => {
      User.findByIdAndUpdate(followerId, {
        $addToSet: {
          following: followingId,
        },
      })
        .then((result) => {
          res.json({
            status: "Success",
            message: "User Followed",
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
exports.unFollowUser = (req, res) => {
  const followerId = req.user._id;
  const followingId = req.params.id;

  User.findByIdAndUpdate(followingId, {
    $pull: {
      follower: followerId,
    },
  })
    .then((result) => {
      User.findByIdAndUpdate(followerId, {
        $pull: {
          following: followingId,
        },
      })
        .then((result) => {
          res.json({
            status: "Success",
            message: "User Un Followed",
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

exports.getFollowers = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .select("follower")
    .populate("follower", "username _id image follower")
    .lean()
    .then((followers) => {
      res.json({
        status: "Success",
        followers,
      });
    })
    .catch((err) => {
      res.json({
        status: "Error",
        err,
      });
    });
};
exports.getFollowing = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .select("following")
    .populate("following", "username _id image follower")
    .lean()
    .then((following) => {
      res.json({
        status: "Success",
        following,
      });
    })
    .catch((err) => {
      res.json({
        status: "Error",
        err,
      });
    });
};

exports.updateUser = (req, res) => {
  const id = req.user._id;
  const { usr } = req.body;
  User.findByIdAndUpdate(id, usr, { new: true }).then((user) => {
    const payload = {
      id: user._id,
      name: user.username,
      email: user.email,
      image: user.image,
      imageId: user.imageId,
      follower: user.follower,
      following: user.following,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 7200 },
      (err, token) => {
        if (err) {
          throw err;
        } else {
          res.cookie("jwt", token, {
            secure: true,
          });
          res.status(200).json({
            status: "Success",
            message: "User Found",
            token: `${token}`,
          });
        }
      }
    );
  });
};
