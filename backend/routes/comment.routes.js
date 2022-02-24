const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment.controllers");
const auth = require("../middleware/auth");

router.get("/:id", auth, commentCtrl.getAllComments);
router.post("/", auth, commentCtrl.createComment);
router.delete("/:id", auth, commentCtrl.deleteComment);
router.put("/:id", auth, commentCtrl.modifyComment);

module.exports = router;