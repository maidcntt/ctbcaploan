const faker = require('faker');
const { User } = require('../../src/models');

const admin = {
  id: 1,
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password: 'password1',
  role: 'admin',
  is_email_verified: false
};

const userOne = {
  id: 2,
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password: 'password1',
  role: 'user',
  is_email_verified: false
};

const userTwo = {
  id: 3,
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password: 'password1',
  role: 'user',
  is_email_verified: false
};

const adminWhoCreateUser = {
  id: 4,
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password: 'password1',
  role: 'admin',
  is_email_verified: false
};

const insertUsers = async (users) => {
  await User.bulkCreate(users, { individualHooks: true });
};

module.exports = {
  admin,
  userOne,
  userTwo,
  adminWhoCreateUser,
  insertUsers
};
