const conn = require("./conn");
const { Sequelize } = conn;
const Product = require("./Product");
const User = require("./User");
const LineItem = require("./LineItem");
const Order = require("./Order");
const Genre = require("./Genre");
const Category = require("./Category");
const Address = require("./Address");

User.hasMany(Order, {
  foreignKey: {
    allowNull: false,
  },
});
Order.hasMany(LineItem);
LineItem.belongsTo(Product);
Address.belongsTo(User);
Product.belongsTo(Category, {
  foreignKey: {
    allowNull: false,
  },
});
Product.belongsTo(Genre, {
  foreignKey: {
    allowNull: false,
  },
});

module.exports = {
  conn,
  User,
  Product,
  LineItem,
  Order,
  Genre,
  Category,
  Address,
};
