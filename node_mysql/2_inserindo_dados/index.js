const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/books/insertbooks", (req, res) => {
  const title = req.body.title;
  const pagesqty = req.body.pagesqty;

  const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}',${pagesqty})`;

  conn.query(sql, (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "84697854",
  database: "nodemysql",
});

conn.connect((err) => {
  if (err) {
    console.log(err);
  }

  console.log("conectado");
  app.listen(3000);
});
