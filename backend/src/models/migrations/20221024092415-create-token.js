const { tokenTypes } = require('../../config/tokens');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Token', {
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
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Token');
  }
};
