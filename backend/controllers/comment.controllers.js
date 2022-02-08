const models = require("../models");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.createComment = (req, res, next) => {
    if (req.body.content === "") {
        return res.status(400).json({
        error: "Contenu vide",
        });
    }
    models.Comment.create({
        content: req.body.content,
        image: req.body.image,
        idUser: req.body.idUser,
        idPost: req.params.idPost,
    })
        .then((comment) => {
            res.status(201).json({
                message: "Commentaire créé",
                comment: comment,
            });
        })
        .catch((error) => res.status(400).json({ error }));
}