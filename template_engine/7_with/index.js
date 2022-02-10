const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", function (req, res) {
  const user = {
    name: "Matheus",
    surname: "Battisti",
  };

  res.render("home", { user: user, auth: true });
});

app.get("/dashboard", function (req, res) {
  const items = ["Item a", "Item b", "Item c"];

  res.render("dashboard", { items: items });
});

app.get("/post", (req, res) => {
  const post = {
    title: "Aprender node",
    category: "JavaScript",
    body: "este arquivo vai te ajudar a aprender mais ",
    coments: 4,
  };
  res.render("blogpost", { post });
});

app.listen(3000, () => {
  console.log("porta aberta");
});
