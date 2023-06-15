const Sequelize = require('sequelize');
const config = require('../config/config');
const sequelizeConfig = require('./config/config')[config.env];

const db = {};

const sequelize = new Sequelize({ ...sequelizeConfig, logging: false });

const tokenModel = require('./token.model')(sequelize, Sequelize.DataTypes);
const userModel = require('./user.model')(sequelize, Sequelize.DataTypes);
const logModel = require('./log.model')(sequelize, Sequelize.DataTypes);
const lineNotifyModel = require('./lineNotify.model')(sequelize, Sequelize.DataTypes);

// eslint-disable-next-line camelcase
const consoleLogger = require('./consoleLog.model')(sequelize, Sequelize.DataTypes);

db[tokenModel.name] = tokenModel;
db[userModel.name] = userModel;
db[logModel.name] = logModel;
db[lineNotifyModel.name] = lineNotifyModel;
// eslint-disable-next-line camelcase
db[consoleLogger.name] = consoleLogger;


Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
