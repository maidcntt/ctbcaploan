const { sequelize } = require('../../config/config');

const { databaseDevelopment, databaseTest, databaseProduction, ...configWithoutDatabase } = sequelize;

module.exports = {
  development: {
    ...configWithoutDatabase,
    database: databaseDevelopment
  },
  test: {
    ...configWithoutDatabase,
    database: databaseTest
  },
  production: {
    ...configWithoutDatabase,
    database: databaseProduction
  }
};
