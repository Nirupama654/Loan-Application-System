const express = require("express");
const router = express.Router();
const controller = require("../Controllers/DecisionController")

router.get('/:body',controller.get)

module.exports = router;