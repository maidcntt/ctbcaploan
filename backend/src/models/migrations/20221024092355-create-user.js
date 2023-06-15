const { roles } = require('../../config/roles');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      role: {
        allowNull: false,
        type: DataTypes.ENUM(roles),
        defaultValue: 'user'
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
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('User');
  }
};
