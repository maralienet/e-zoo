module.exports = (sequelize, DataTypes) => {
    const Delivery = sequelize.define("Delivery", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        prodId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        deliveryDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });
    
    Delivery.associate = models => {
        Delivery.belongsTo(models.Prods, { foreignKey: 'prodId' });
    };

    return Delivery;
};