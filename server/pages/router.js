const express = require("express");
const router = express.Router();
const Genres = require("../Genres/Genres");
const Country = require("../Country/Country");
const User = require("../auth/User");
const Film = require("../Films/Film");

router.get("/", async (req, res) => {
  const allGenres = await Genres.find();
  const films = await Film.find().populate("country").populate("genre");
  const user = req.user ? await User.findById(req.user._id) : {};
  res.render("index", {
    genres: allGenres,
    user,
    films,
  });
});

router.get("/login", (req, res) => {
  res.render("login", { user: req.user ? req.user : {} });
});

router.get("/register", (req, res) => {
  res.render("register", { user: req.user ? req.user : {} });
});

router.get("/profile/:id", async (req, res) => {
  const allGenres = await Genres.find();
  const user = await User.findById(req.params.id)
    .populate("toWatch")
    .populate({ path: "toWatch", populate: { path: "country" } })
    .populate({ path: "toWatch", populate: { path: "genre" } });

  const films = await Film.find()
    .populate("country")
    .populate("genre")
    .populate("author");
  if (user) {
    res.render("profile", {
      user: user,
      genres: allGenres,
      loginUser: req.user,
      films: films,
    });
  } else {
    res.redirect("/not-found");
  }
});

router.get("/admin/:id", async (req, res) => {
  const allGenres = await Genres.find();
  const user = await User.findById(req.params.id);

  const films = await Film.find()
    .populate("country")
    .populate("genre")
    .populate("author");
  res.render("adminProfile", {
    user: user,
    genres: allGenres,
    loginUser: req.user,
    films: films,
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

router.get("/edit/:id", async (req, res) => {
  const allGenres = await Genres.find();
  const allCountries = await Country.find();
  const film = await Film.findById(req.params.id);
  res.render("editFilm", {
    genres: allGenres,
    countries: allCountries,
    user: req.user ? req.user : {},
    film,
  });
});

router.get("/not-found", (req, res) => {
  res.render("notFound");
});

router.get("/filmInfo/:id", async (req, res) => {
  const allGenres = await Genres.find();
  const allCountries = await Country.find();
  const film = await Film.findById(req.params.id);
  res.render("filmInfo", {
    genres: allGenres,
    countries: allCountries,
    user: req.user ? req.user : {},
    film,
  });
});

module.exports = router;
