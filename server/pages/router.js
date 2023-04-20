const express = require("express");
const router = express.Router();
const Genres = require("../Genres/Genres");
const Country = require("../Country/Country");

router.get("/", async (req, res) => {
  const allGenres = await Genres.find();
  res.render("index", { genres: allGenres });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/profile", (req, res) => {
  res.render("profile");
});

router.get("/admin", (req, res) => {
  res.render("adminProfile");
});

router.get("/new", async (req, res) => {
  const allGenres = await Genres.find();
  const allCountries = await Country.find();
  res.render("newFilm", { genres: allGenres, countries: allCountries });
});

router.get("/edit", async (req, res) => {
  const allGenres = await Genres.find();
  const allCountries = await Country.find();
  res.render("editFilm", { genres: allGenres, countries: allCountries });
});

module.exports = router;
