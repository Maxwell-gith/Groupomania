const models = require("../models");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.createComment = (req, res, next) => {
    if (!req.body.content) {
        return res.status(400).json({
        error: "Contenu vide",
        });
    }
    models.Comment.create({
        content: req.body.content,
        idUser: req.body.iduser,
        idPost: req.body.idPost,
        image: req.body.content && req.file
          ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
          : 'no image',
    })
        .then((comment) => {
            res.status(201).json({
                message: "Commentaire créé",
                comment: comment,
            });
        })
        .catch((error) => res.status(400).json({ error: "Une erreur est survenue!" }));
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
  
  exports.modifyComment = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;

    if (req.body.content === "") {
        return res.status(400).json({
        error: "Contenu vide",
        });
    }
    models.Comment.findOne({
      where: { id: req.params.id  },
    })
    .then((comment) => { 
      if (comment.idUser === userId) {        
        comment.update({
            content: req.body.content          
        })  
          .then(() => res.status(200).json({ message: "Commentaire modifié !" }))
          .catch((error) =>
            res.status(400).json({ error: "Impossible de mettre à jour ce commentaire !" })
          );
    }});
  };

  exports.deleteComment = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
 
    models.Comment.findOne({
      where: { id: req.params.id },
    })
      .then((comment) => {  
        if (comment.idUser === userId || isAdmin === true) {        
          comment.destroy()
              .then(() => {
                res.status(200).json({ message: "Commentaire supprimé !" });
              })
              .catch((error) => {
                res.status(400).json({ error: error, message: "Le commentaire n'a pas pu être supprimé" });
              });
        }})
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  };

