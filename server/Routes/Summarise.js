const express = require("express");
const router = express.Router();
const controller = require("../Controllers/SummariseApplication")

router.post('/',controller.post)

module.exports = router;