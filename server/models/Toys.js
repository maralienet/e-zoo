module.exports = (sequelize, DataTypes) => {
    const Toys = sequelize.define("Toys", {
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
        }
    });
    
    Toys.associate = models => {
        Toys.belongsTo(models.Prods, { foreignKey: 'prodId' });
    };

    return Toys;
};