const models = require("../models");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.createPost = (req, res, next) => {
    if (!req.body.title || !req.body.content) {
        return res.status(400).json({
            error: "Titre ou contenu vide",
        });
    }
    models.Post.create({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        iduser: req.body.iduser,
    })
    .then((post) => {
        res.status(201).json({
            message: "Post créé",
            post: post,
        });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
    models.Post.findAll({
      order: [["updatedAt", "DESC"]],
      attributes: [
        "id",
        "idUsers",
        "title",
        "content",
        "image",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: models.User,
          attributes: ["name", "firstname"],
        },
      ],
    })
      .then((posts) => {
        res.status(200).json(posts);
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  };