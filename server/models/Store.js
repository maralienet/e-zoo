module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define("Store", {
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
        producer:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    
    Store.associate = models => {
        Store.belongsTo(models.Prods, { foreignKey: 'prodId' });
    };

    return Store;
};