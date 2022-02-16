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
        idUser: req.body.idUser,
        idPost: req.body.idPost,
        image: 'no image',
    })
        .then((comment) => {
            res.status(201).json({
                message: "Commentaire créé",
                comment: comment,
            });
        })
        .catch((error) => res.status(400).json({ error }));
}

exports.getAllComments = (req, res, next) => {
    models.Comment.findAll({
      attributes: [
        "id",
        "idUser",
        "idPost",
        "content",
        "createdAt",
        "updatedAt",
      ],
      where: { idPost: req.params.id, },
      order: [["updatedAt", "DESC"]],
      include: [
        {
          model: models.User,
          attributes: ["name", "firstname"],
        },
      ],
    })
      .then((comments) => {
        res.status(200).json(comments);
      })
      .catch((error) => res.status(400).json({ error }));
  };