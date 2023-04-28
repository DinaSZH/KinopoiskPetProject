const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FilmSchema = new mongoose.Schema({
  titleRus: String,
  titleEng: String,
  year: Number,
  time: String,
  country: { type: Schema.Types.ObjectId, ref: "country" },
  genre: { type: Schema.Types.ObjectId, ref: "genre" },
  image: String,
  author: { type: Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("film", FilmSchema);
