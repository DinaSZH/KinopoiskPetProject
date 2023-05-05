const express = require("express");
const router = express.Router();
const { upload } = require("./multer");
const { createFilm, editFilm, deleteFilm } = require("./controller");
const { isAuth } = require("../auth/middlewares");

router.post("/api/films/new", isAuth, upload.single("image"), createFilm);
router.post("/api/films/edit", isAuth, upload.single("image"), editFilm);
router.delete("/api/films/:id", isAuth, deleteFilm);

module.exports = router;
