const express = require("express");
const app = express();
const path = require ("path");

const userRoutes = require("./routes/user.routes");
const profileRoutes = require("./routes/profile.routes");
const postRoutes = require("./routes/post.routes");


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });
  
  app.use(express.json());
  
  app.use("/images", express.static(path.join(__dirname, "images")));

  app.use("/api/user", userRoutes);
  app.use("/api/profile", profileRoutes);
  app.use("/api/posts", postRoutes);

  module.exports = app;