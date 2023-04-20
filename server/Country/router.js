const express = require("express");
const router = express.Router();
const { getAllCountries } = require("./controller");
const writeDataCountry = require("./seed");

router.get("/api/country", getAllCountries);
writeDataCountry();
module.exports = router;
