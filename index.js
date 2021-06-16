require("dotenv").config();
const express = require("express"),
  passport = require("passport"),
  cors = require("cors"),
  morgan = require("morgan"),
  mongoose = require("mongoose"),
  cookieParser = require("cookie-parser"),
  port = process.env.PORT || 8000,
  dbUri = process.env.DATABASE_URL,
  userRoutes = require("./src/api/Routes/User"),
  profileRoutes = require("./src/api/Routes/profile"),
  postRoutes = require("./src/api/Routes/Posts"),
  cloudinaryRoutes = require("./src/api/Routes/Cloudinary"),
  path = require("path");
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
require("./config/passoprt")(passport);

app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/post", postRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);

// Static Site
if (process.env.ENV === "PROD") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server Live at port: ${port}`);
  mongoose
    .connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.log("Connection error");
    });
});
