const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment.controllers");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/:id", auth, commentCtrl.getAllComments);
router.post("/", auth, multer, commentCtrl.createComment);
router.delete("/:id", auth, commentCtrl.deleteComment);
router.put("/:id", auth, multer, commentCtrl.modifyComment);

module.exports = router;