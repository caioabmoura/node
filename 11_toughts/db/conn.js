const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("toughts", "root", "84697854", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("autenticado");
} catch (error) {
  console.log(error);
}

module.exports = sequelize;
