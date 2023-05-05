const express = require("express");
const router = express.Router();

const { saveToWatch } = require("./controller");
//const writeDataGenre = require("./seed");

router.get("/api/saveToWatch", saveToWatch);

module.exports = router;
