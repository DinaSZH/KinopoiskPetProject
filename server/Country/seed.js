const Country = require("./Country");
const data = [
  "Россия",
  "СССР",
  "США",
  "Франция",
  "Южная Корея ",
  "Великобритания",
  "Япония",
  "Испания",
  "Италия",
  "Германия",
  "Турция",
  "Швеция",
  "Дания",
  "Норвегия",
  "Гонконг",
];

async function writeDataCountry() {
  const length = await Country.count();
  if (length == 0) {
    data.map((item, index) => {
      new Country({
        name: item,
        key: index,
      }).save();
    });
  }
}

module.exports = writeDataCountry;
