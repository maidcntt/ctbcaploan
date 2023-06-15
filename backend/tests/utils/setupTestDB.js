const db = require('../../src/models');

const setupTestDB = () => {
  beforeEach(async () => {
    await db.sequelize.sync({ force: true });
  });
  afterAll(async () => {
    await db.sequelize.close();
  });
};

module.exports = setupTestDB;
