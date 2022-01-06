
const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post.controllers");
const auth = require("../middleware/auth");

const multer = require("../middleware/multer-config");

// Routes de l'API pour les Posts
// router.get("/", auth, postCtrl.getAllPost);
// router.get("/:id", auth, postCtrl.getOnePost);
router.post("/posts/", auth, postCtrl.createPost);
// router.delete("/:id", auth, postCtrl.deletePost);
// router.put("/modif", auth, multer, postCtrl.modifyPost);

module.exports = router;