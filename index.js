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
  notifRoutes = require("./src/api/Routes/Notification"),
  OnlineUser = require("./src/api/models/OnlineUsers"),
  path = require("path");
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(express.json({ limit: "25mb" }));
app.use(cookieParser());
app.use(passport.initialize());
require("./config/passoprt")(passport);

app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/post", postRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/notifications", notifRoutes);

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
// Static Site
if (process.env.ENV === "PROD") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

httpServer.listen(port, () => {
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
app.io = io;
io.on("connection", (socket) => {
  console.log("Socket Connected");
  socket.on("newUser", (arg) => {
    console.log("new user", [arg, socket.id]);
    new OnlineUser({
      user: arg,
      socketId: socket.id,
    })
      .save()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
