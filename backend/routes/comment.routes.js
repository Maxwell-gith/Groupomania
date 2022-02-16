const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment.controllers");
const auth = require("../middleware/auth");

router.get("/", auth, commentCtrl.getAllComments);
router.post("/", auth, commentCtrl.createComment);
// router.delete("/:idPosts/comment/:id", auth, commentCtrl.deleteComment);

module.exports = router;