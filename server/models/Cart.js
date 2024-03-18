module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define("Cart", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        number:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        prodId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    
    Cart.associate = models => {
        Cart.belongsTo(models.Prods, { foreignKey: 'prodId' });
        Cart.belongsTo(models.Users, { foreignKey: 'userId' });
    };

    return Cart;
};