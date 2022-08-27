const conn = require("./conn");
const { Sequelize } = conn;

const Category = conn.define("category", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Category;
