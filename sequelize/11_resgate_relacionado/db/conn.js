const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodesequelize", "root", "84697854", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
