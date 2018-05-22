// Admin sequelize model

module.exports = (sequelize, DataTypes) => {
    var Admin = sequelize.define('Admin', {
        name: DataTypes.STRING,
        password: DataTypes.STRING
    },
    {
        freezeTableName: true
    });
    return Admin;
};
