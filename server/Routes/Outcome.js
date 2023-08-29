const express = require("express");
const router = express.Router();
const controller = require("../Controllers/OutcomeController")

router.get('/',controller.get)

module.exports = router;