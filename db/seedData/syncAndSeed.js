const { conn, User, Address, Order, LineItem } = require("../");
const { USERS } = require("./seedDataUsers");

const { seedDataProducts } = require("./seedDataProducts");

const syncAndSeed = async () => {
  try {
    await conn.sync({ force: true });

    //console.log(dataProducts)
    seedDataProducts();
    await Promise.all(USERS.map((user) => User.create(user)));
    const lucy = await User.create({
      firstName: "Lucy",
      lastName: "Bar",
      email: "lucy_bar@gmail.com",
      password: "lucy_pw",
      phone: "123-456-7890",
      userType: "admin",
    });

    await Address.create({
      apt: "2S",
      street: "3333 Acme str",
      city: "NYC",
      state: "NY",
      zipcode: "12345",
      userId: lucy.id,
    });

    const date = new Date();
    const lucyCart1 = await Order.create({
      userId: lucy.id,
      orderDate: date,
      isCart: false,
    });
    const lucyCart2 = await Order.create({
      userId: lucy.id,
      orderDate: date,
      isCart: false,
    });
    await LineItem.create({
      quantity: 5,
      productId: 2,
      orderId: lucyCart1.id,
    });
    await LineItem.create({
      quantity: 2,
      productId: 3,
      orderId: lucyCart1.id,
    });
    await LineItem.create({
      quantity: 3,
      productId: 7,
      orderId: lucyCart2.id,
    });
    await LineItem.create({
      quantity: 1,
      productId: 6,
      orderId: lucyCart2.id,
    });
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = { syncAndSeed };
