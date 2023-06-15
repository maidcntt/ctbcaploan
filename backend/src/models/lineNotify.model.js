const { Model } = require('sequelize');

const targetTypes = ['USER', 'GROUP'];

module.exports = (sequelize, DataTypes) => {
  class LineNotify extends Model {
    static associate(models) {
      LineNotify.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
    }
  }
  LineNotify.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue('name', value.trim());
        }
      },
      access_token: {
        allowNull: false,
        type: DataTypes.STRING
      },
      target_type: {
        allowNull: false,
        type: DataTypes.ENUM(targetTypes),
        validate: {
          isIn: [targetTypes]
        }
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
      modelName: 'LineNotify',
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
  return LineNotify;
};
