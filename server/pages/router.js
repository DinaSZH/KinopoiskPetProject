const express = require("express");
const router = express.Router();
const Genres = require("../Genres/Genres");
const Country = require("../Country/Country");
const User = require("../auth/User");

router.get("/", async (req, res) => {
  const allGenres = await Genres.find();
  res.render("index", { genres: allGenres, user: req.user ? req.user : {} });
});

router.get("/login", (req, res) => {
  res.render("login", { user: req.user ? req.user : {} });
});

router.get("/register", (req, res) => {
  res.render("register", { user: req.user ? req.user : {} });
});

router.get("/profile/:id", async (req, res) => {
  const allGenres = await Genres.find();
  const user = await User.findById(req.params.id);
  if (user) {
    res.render("profile", {
      user: user,
      genres: allGenres,
      loginUser: req.user,
    });
  } else {
    res.redirect("/not-found");
  }
});

router.get("/admin/:id", async (req, res) => {
  const allGenres = await Genres.find();
  const user = await User.findById(req.params.id);
  res.render("adminProfile", {
    user: user,
    genres: allGenres,
    loginUser: req.user,
  });
});

router.get("/new", async (req, res) => {
  const allGenres = await Genres.find();
  const allCountries = await Country.find();
  res.render("newFilm", {
    genres: allGenres,
    countries: allCountries,
    user: req.user ? req.user : {},
  });
});

router.get("/edit", async (req, res) => {
  const allGenres = await Genres.find();
  const allCountries = await Country.find();
  res.render("editFilm", {
    genres: allGenres,
    countries: allCountries,
    user: req.user ? req.user : {},
  });
});

router.get("/not-found", (req, res) => {
  res.render("notFound");
});

module.exports = router;
