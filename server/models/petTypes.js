module.exports = (sequelize, DataTypes) => {
    const petTypes = sequelize.define("petTypes", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    petTypes.associate = models => {
        models.petTypes.hasMany(models.Prods, { foreignKey: 'petTypeId' });
    };

    return petTypes;
};