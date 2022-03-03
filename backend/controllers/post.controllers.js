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
        idUser: req.body.iduser,
        image: req.body.content && req.file
        ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        : 'no image',
    })
    .then((post) => {
        res.status(201).json({
            message: "Post créé",
            post: post,
        });
    })
    .catch((error) => res.status(400).json({ error: "Une erreur est survenue!" }));
};

exports.getAllPosts = (req, res, next) => {
    models.Post.findAll({
      order: [["updatedAt", "DESC"]],
      attributes: [
        "id",
        "idUser",
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

  exports.modifyPost = (req, res, next) => {  
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;

    if (req.body.title == "" || req.body.content == "") {
      return res
        .status(400)
        .json({ error: "Merci de remplir tous les champs !" });
    }  
    models.Post.findOne({
      where: { id: req.params.id  },
    })
    .then((post) => { 
      if (post.idUser === userId) {        
        post.update({
            title: req.body.title,
            content: req.body.content          
        })  
          .then(() => res.status(200).json({ message: "Message modifié !" }))
          .catch((error) =>
            res.status(400).json({ error: "Impossible de mettre à jour ce Message !" })
          );
    }});
  };

  exports.deletePost = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
 
    models.Post.findOne({
      where: { id: req.params.id },
    })
      .then((post) => {  
        if (post.idUser === userId || isAdmin === true) {        
          post.destroy()
              .then(() => {
                res.status(200).json({ message: "Message supprimé !" });
              })
              .catch((error) => {
                res.status(400).json({ error: error, message: "Le message n'a pas pu être supprimé" });
              });
        }})
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  };






