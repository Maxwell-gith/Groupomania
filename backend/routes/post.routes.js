
const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post.controllers");
const auth = require("../middleware/auth");

const multer = require("../middleware/multer-config");

// Routes de l'API pour les Posts
router.get("/", auth, postCtrl.getAllPosts);
// router.get("/:id", auth, postCtrl.getOnePost);
router.post("/", auth, postCtrl.createPost);
router.delete("/", auth, postCtrl.deletePost);
// router.put("/modif", auth, multer, postCtrl.modifyPost);

module.exports = router;