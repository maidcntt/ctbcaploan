const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ConsoleLog extends Model { }
    ConsoleLog.init({
        id: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        sessionId: { allowNull: false, type: DataTypes.STRING, defaultValue: '' },
        username:  { allowNull: false, type: DataTypes.STRING(20), defaultValue: '' },
        type: { allowNull: false, type: DataTypes.STRING(20), defaultValue: '' },
        log: { allowNull: false, type: DataTypes.STRING, defaultValue: '' },
        data: { allowNull: true, type: DataTypes.JSON },
        "created_at": { allowNull: false, type: DataTypes.DATE },
        "updated_at": { allowNull: false, type: DataTypes.DATE },
        "deleted_at": { allowNull: true, type: DataTypes.DATE },
    }, {
        sequelize,
        modelName: 'ConsoleLog',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        defaultScope: {
            attributes: {
                exclude: ['updated_at', 'deleted_at']
            }
        }
    });

    return ConsoleLog;
};