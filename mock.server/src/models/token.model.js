const { Model } = require('sequelize');
const { tokenTypes } = require('../config/tokens');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      Token.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
    }
  }
  Token.init(
    {
      token: {
        allowNull: false,
        type: DataTypes.STRING,
        primaryKey: true
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'User'
          },
          key: 'id'
        }
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM(Object.values(tokenTypes))
      },
      expires: {
        allowNull: false,
        type: DataTypes.DATE
      },
      blacklisted: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deleted_at: {
        allowNull: true,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: 'Token',
      freezeTableName: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      underscored: true,
      paranoid: true,
      defaultScope: {
        attributes: {
          exclude: ['created_at', 'updated_at', 'deleted_at']
        }
      }
    }
  );
  return Token;
};
