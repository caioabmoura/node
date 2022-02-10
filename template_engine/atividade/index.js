const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const path = require("path");

const hbs = exphbs.create({
  partialsDir: path.join(__dirname, "views/partials"),
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static("public"));

const mc = [
  {
    name: "donl",
    local: "fortaleza",
    bestAlbum: "roteiro para ainouz ",
    bestSong: "Aquela Fé",
  },
  {
    name: "bk",
    local: "rio de janeiro",
    bestAlbum: "castelos e ruínas",
    bestSong: "quadros",
  },
  {
    name: "djonga",
    local: "belo horizonte",
    bestAlbum: "heresia",
    bestSong: "esquimó",
  },
];

app.get("/home", (req, res) => {
  res.render("home", { mc });
});

app.get("/mcs/:id", (req, res) => {
  const mcs = mc[req.params.name];

  res.render("mcs", { mcs });
});

app.listen(3000, () => {
  console.log("porta aberta");
});
