const conn = require("./conn");
const { Sequelize } = conn;
const { STRING, INTEGER, ENUM } = Sequelize;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = conn.define("user", {
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: STRING,
    allowNull: false,
    validate: {
      is: /^[0-9-]+$/,
    },
  },
  userType: {
    type: ENUM,
    values: ["user", "admin"],
    defaultValue: "user",
  },
  password: {
    type: STRING,
    allowNull: false,
  },
});

User.addHook("beforeSave", async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.prototype.createOrderFromCart = async function () {
  const cart = await this.getCart();
  cart.isCart = false;
  return cart.save();
};

User.prototype.addToCart = async function ({ product, quantity }) {
  const cart = await this.getCart();
  let lineItem = await conn.models.lineItem.findOne({
    where: {
      productId: product.id,
      orderId: cart.id,
    },
  });
  if (lineItem) {
    lineItem.quantity = quantity;
    if (lineItem.quantity) {
      await lineItem.save();
    } else {
      await lineItem.destroy();
    }
  } else {
    await conn.models.lineItem.create({
      productId: product.id,
      quantity,
      orderId: cart.id,
    });
  }
  return this.getCart();
};

User.prototype.getCart = async function () {
  let order = await conn.models.order.findOne({
    where: {
      userId: this.id,
      isCart: true,
    },
    include: [
      {
        model: conn.models.lineItem,
        include: [conn.models.product],
      },
    ],
  });
  if (!order) {
    const date = new Date();
    order = await conn.models.order.create({
      userId: this.id,
      orderDate: date,
    });
    order = await conn.models.order.findByPk(order.id, {
      include: [conn.models.lineItem],
    });
  }
  return order;
};

User.prototype.addAddress = async function (address) {
  const isPrimary = address.isPrimary;
  if (isPrimary) {
    const primaryAddress = await conn.models.address.findOne({
      where: {
        userId: this.id,
        isPrimary: true,
      },
    });

    if (primaryAddress) {
      primaryAddress.isPrimary = false;
      await primaryAddress.save();
    }
  }

  return await conn.models.address.create({ ...address, userId: this.id });
};

User.prototype.getOrders = async function () {
  console.log("hellllooooooo", await conn.models.lineItem.findAll());
  const orders = await conn.models.order.findAll({
    where: {
      userId: this.id,
      isCart: false,
    },
    include: [{ model: conn.models.lineItem, include: [conn.models.product] }],
  });
  return orders;
};

User.authenticate = async function (credentials) {
  const user = await this.findOne({
    where: {
      email: credentials.email,
    },
  });
  if (user && (await bcrypt.compare(credentials.password, user.password))) {
    return jwt.sign({ id: user.id }, process.env.JWT);
  } else {
    const error = new Error("Bad Credentials");
    error.status = 401;
    throw error;
  }
};

User.findByToken = async function findByToken(token) {
  try {
    const id = jwt.verify(token, process.env.JWT).id;
    const user = await User.findByPk(id);
    if (!user) {
      throw "error";
    }
    return user;
  } catch (ex) {
    const error = new Error("bad token");
    error.status = 401;
    throw error;
  }
};

module.exports = User;
