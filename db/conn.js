const Sequelize = require("sequelize");

// const config = {};

// if (process.env.QUIET) {
//   config.logging = false;
// }

const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_db",
  { logging: false }
);

module.exports = conn;
