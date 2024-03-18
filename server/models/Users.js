module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Минск"
        },
        street: {
            type: DataTypes.STRING,
            allowNull: true
        },
        house: {
            type: DataTypes.STRING,
            allowNull: true
        },
        corps: {
            type: DataTypes.STRING,
            allowNull: true
        },
        floor: {
            type: DataTypes.STRING,
            allowNull: true
        },
        flat: {
            type: DataTypes.STRING,
            allowNull: true
        },
    });

    Users.associate = models => {
        models.Users.hasMany(models.Cart, { foreignKey: 'userId' });
        models.Users.hasMany(models.Admins, { foreignKey: 'userId' });
    };
    return Users;
};