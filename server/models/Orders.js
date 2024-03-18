module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define("Orders", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        orderCode: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total:{
            type: DataTypes.FLOAT,
            allowNull: false
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
    
    Orders.associate = models => {
        Orders.belongsTo(models.Prods, { foreignKey: 'prodId' });
        Orders.belongsTo(models.Users, { foreignKey: 'userId' });
    };

    return Orders;
};