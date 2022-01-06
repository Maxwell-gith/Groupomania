const models = require("../models");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.createPost = (req, res, next) => {
    const userId = localStorage.getItem("id");
    if (!req.body.title || !req.body.content) {
        return res.status(400).json({
            error: "Titre ou contenu vide",
        });
    }
    models.Post.create({
        title: req.body.title,
        content: req.body.content,
        // image: req.body.image,
        idUser: userId,
    })
    .then((post) => {
        res.status(201).json({
            message: "Post créé",
            post: post,
        });
    })
    .catch((error) => res.status(400).json({ error }));
};