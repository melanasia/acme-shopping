const conn = require("./conn");
const { Sequelize } = conn;
const { STRING, INTEGER, TEXT, DECIMAL } = Sequelize;

const Product = conn.define("product", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  inventory: {
    type: INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  image: {
    type: TEXT,
  },
  cost: {
    allowNull: false,
    type: DECIMAL(10, 2),
    defaultValue: 0,
  },
});

module.exports = Product;
