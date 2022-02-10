const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodesequelize", "root", "84697854", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("conctado com sucesso");
} catch (err) {
  console.log("nao foi possivel conectar ", err);
}

module.exports = sequelize;
