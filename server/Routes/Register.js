const express = require("express");
const router = express.Router();
const controller = require("../Controllers/RegisterController")

router.post('/',controller.post)

module.exports = router;