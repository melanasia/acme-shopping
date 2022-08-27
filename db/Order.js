const conn = require("./conn");
const { Sequelize } = conn;

const Order = conn.define("order", {
  isCart: {
    allowNull: false,
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  orderDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
});

module.exports = Order;
