const express = require("express");
const app = express();
const path = require ("path");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Déclaration des routes
const userRoutes = require("./routes/user.routes");
const profileRoutes = require("./routes/profile.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");

// Headers CORS
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
  
  // Conversion en JSON
  app.use(express.json());

  // Gestion des images
  app.use("/images", express.static(path.join(__dirname, "images")));

  // Lancement helmet
  app.use(helmet());
  app.use(helmet.frameguard({ action: 'deny' })); //Pour interdire d'inclure cette page dans une iframe

  // Lancement et config rateLimit
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Pour 15 min
    max: 500 // limite de 100 requests 
  });

  app.use(limiter);

  // Lancement des routes
  app.use("/api/user", userRoutes);
  app.use("/api/profile", profileRoutes);
  app.use("/api/posts", postRoutes);
  app.use("/api/comments", commentRoutes);

  module.exports = app;