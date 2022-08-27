const conn = require("./conn");
const { Sequelize } = conn;

const { STRING, BOOLEAN } = Sequelize;

const Address = conn.define("address", {
  apt: {
    type: STRING,
  },
  street: {
    type: STRING,
    allowNull: false,
  },
  city: {
    type: STRING,
    allowNull: false,
  },
  state: {
    type: STRING(2),
    allowNull: false,
  },
  zipcode: {
    type: STRING(5),
    allowNull: false,
    validate: {
      is: /^[0-9]{5}$/i,
    },
  },
  isPrimary: {
    type: BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Address;
