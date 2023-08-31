const express = require("express");
const router = express.Router();
const controller = require("../Controllers/LoginController")

router.post('/',controller.post)

module.exports = router;