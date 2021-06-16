const Profile = require("../models/Profile");

exports.getProfile = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Profile.findOne({
    user: id,
  })
    .populate("user", "-password -__v -createdAt -updatedAt")
    .then((data) => {
      if (data) {
        res.json({
          status: "Success",
          message: "Proifle found",
          data,
        });
      }
    })
    .catch((err) => {
      res.json({
        status: "Fail",
        message: "Some Error Occured",
        err,
      });
    });
};

exports.createProfile = (req, res) => {
  const id = req.user._id;
  const newProfile = new Profile({
    bio: req.body.bio,
    house: req.body.house,
    name: req.body.name,
    dob: req.body.dob,
    user: id,
  });
  newProfile
    .save()
    .then((result) => {
      res.json({
        status: "Success",
        message: "Profile Created",
      });
    })
    .catch((err) => {
      res.json({
        status: "Fail",
        message: "Some error ocured",
        err,
      });
    });
};

exports.updateProfile = (req, res) => {
  const id = req.params.id;
  if (id == req.user._id) {
    Profile.findOneAndUpdate(
      {
        user: id,
      },
      req.body,
      {
        new: true,
      }
    )
      .then((result) => {
        res.json({
          status: "Success",
          message: "Profile Updated",
          result,
        });
      })
      .catch((err) => {
        res.json({
          status: "Fail",
          message: "An error Occured",
          err,
        });
      });
  } else {
    res.status(401).json({
      status: "Unauthorised",
      message: "Dont try to update someone else's profile '_'",
    });
  }
};
