const Aquariums = require("./Aquariums");

module.exports = (sequelize, DataTypes) => {
    const Accessories = sequelize.define("Accessories", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        prodId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        material: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    
    Aquariums.associate = models => {
        Aquariums.belongsTo(models.Prods, { foreignKey: 'prodId' });
    };

    return Accessories;
};