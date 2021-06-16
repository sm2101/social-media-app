const JwtlStrategy = require("passport-jwt").Strategy,
  mongoose = require("mongoose"),
  User = mongoose.model("users");

const opts = {};
opts.jwtFromRequest = (req) => req.cookies.jwt;
opts.secretOrKey = process.env.JWT_SECRET;
module.exports = (passport) => {
  passport.use(
    new JwtlStrategy(opts, (payload, done) => {
      console.log(payload);
      User.findById(payload.id)
        .select("-password")
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => {
          return done(err, false);
        });
    })
  );
};
