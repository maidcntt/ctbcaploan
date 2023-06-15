const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const { roles } = require('../config/roles');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Token);
    }
  }
  User.init(
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
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true
        },
        set(value) {
          this.setDataValue('email', value.trim().toLowerCase());
        }
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isPasswordMinLength(value) {
            if (value.length < 8) {
              throw new Error('Password must be at least 8 characters');
            }
          },
          isPasswordMatch(value) {
            if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
              throw new Error('Password must contain at least one letter and one number');
            }
          }
        },
        set(value) {
          this.setDataValue('password', value.trim());
        }
      },
      role: {
        allowNull: false,
        type: DataTypes.ENUM(roles),
        defaultValue: 'user',
        validate: {
          isIn: [roles]
        }
      },
      is_email_verified: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      superior_id: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      status: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          max: 2,
          min: 0
        },
        comment: '狀態:0未啟用、1啟用、2忘記密碼'
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
      modelName: 'User',
      freezeTableName: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      underscored: true,
      paranoid: true,
      defaultScope: {
        attributes: {
          exclude: ['password', 'is_email_verified', 'created_at', 'updated_at', 'deleted_at']
        }
      }
    }
  );

  User.beforeCreate(async (user) => {
    // eslint-disable-next-line no-param-reassign
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(8));
  });
  User.beforeUpdate(async (user) => {
    if (user.password) {
      // eslint-disable-next-line no-param-reassign
      user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(8));
    }
  });

  return User;
};
