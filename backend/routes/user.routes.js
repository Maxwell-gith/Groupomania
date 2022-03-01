const express = require("express");
const multer = require("../middleware/multer-config");
const router = express.Router();
const userCtrl = require("../controllers/user.controllers");

router.post("/signup", multer, userCtrl.signup);
router.post("/login", multer, userCtrl.login);

module.exports = router;