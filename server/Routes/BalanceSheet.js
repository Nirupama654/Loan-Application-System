const express = require("express");
const router = express.Router();
const controller = require("../Controllers/BalanceSheetController")

router.get('/:id',controller.get)

module.exports = router;