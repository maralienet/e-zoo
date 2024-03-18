module.exports = (sequelize, DataTypes) => {
    const Admins = sequelize.define("Admins", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        accessLvl: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 3
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });

    Admins.associate = models => {
        Admins.belongsTo(models.Users, { foreignKey: 'userId' });
    };
    return Admins;
};