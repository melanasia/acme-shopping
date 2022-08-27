const { faker } = require("@faker-js/faker");

let USERS = [];

function createUser() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.number("###-###-####"),
    password: "1234",
  };
}

Array.from({ length: 20 }).forEach(() => USERS.push(createUser()));

USERS = USERS.map((USER) => {
  return {
    ...USER,
    email: faker.internet.email(USER.firstName, USER.lastName),
  };
});

module.exports = { USERS };
