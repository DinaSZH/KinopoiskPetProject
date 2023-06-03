const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  email: String,
  full_name: String,
  password: String,
  isAdmin: Boolean,
  googleId: String,
  toWatch: [{ type: Schema.Types.ObjectId, ref: "film" }],
  watched: [{ type: Schema.Types.ObjectId, ref: "film" }],
});

module.exports = mongoose.model("user", UserSchema);
