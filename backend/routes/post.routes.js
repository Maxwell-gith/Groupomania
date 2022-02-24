
const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post.controllers");
const auth = require("../middleware/auth");

const multer = require("../middleware/multer-config");

// Routes de l'API pour les Posts
router.get("/", auth, postCtrl.getAllPosts);
router.post("/", auth, postCtrl.createPost);
router.delete("/:id", auth, postCtrl.deletePost);
router.put("/:id", auth, postCtrl.modifyPost);


module.exports = router;