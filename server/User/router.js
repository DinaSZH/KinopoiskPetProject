const express = require("express");
const router = express.Router();

const { saveToWatch } = require("./controller");

router.post("/api/saveToWatch", saveToWatch);

module.exports = router;
