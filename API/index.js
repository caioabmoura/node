const express = require("express");
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//rotas - endpoints
app.post("/createproduct", (req, res) => {
  const name = req.body.name;
  const price = req.body.price;

  console.log(name);
  console.log(price);

  if (!name) {
    res.status(422).json({ message: "o campo nome é obrigatorio!" });
    return;
  }

  res.status(201).json({ message: `o produto ${name}, custa R$${price}` });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "primeira rota criada com sucesso" });
});

app.listen(3000, () => {
  console.log("porta aberta");
});
