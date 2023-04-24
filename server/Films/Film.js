const mongoose = require("mongoose");

const FilmSchema = new mongoose.Schema({
  titleRus: String,
  titleEng: String,
  year: Number,
  time: String,
  country: String,
  genre: String,
  image: String,
});

module.exports = mongoose.model("film", FilmSchema);
