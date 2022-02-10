const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodemvc", "root", "84697854", {
  host: "localhost",
  dialect: "mysql",
});
try {
  sequelize.authenticate();
  console.log("conectado");
} catch (error) {
  console.log(`não foi possivel conectar: ${error}`);
}

module.exports = sequelize;
