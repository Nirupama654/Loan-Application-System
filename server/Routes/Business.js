const express = require("express");
const router = express.Router();
const controller = require("../Controllers/BusinessController")

router.post('/',controller.post)

module.exports = router;