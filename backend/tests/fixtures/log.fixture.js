const faker = require('faker');
const { Log } = require('../../src/models');

const logOne = {
  id: 1,
  name: faker.random.word()
};

const logTwo = {
  id: 2,
  name: faker.random.word()
};

const insertLogs = async (logs) => {
  await Log.bulkCreate(logs);
};

module.exports = {
  logOne,
  logTwo,
  insertLogs
};
