const Genres = require("./Genres");
const data = [
  "Комедии",
  "Мультфилмы",
  "Ужасы",
  "Фантастика",
  "Триллеры ",
  "Боевики",
  "Комедии",
  "Детективы",
  "Мелодрамы",
  "Приключения",
  "Фэнтези",
];

async function writeDataGenre() {
  const length = await Genres.count();
  if (length == 0) {
    data.map((item, index) => {
      new Genres({
        name: item,
        key: index,
      }).save();
    });
  }
}

module.exports = writeDataGenre;
