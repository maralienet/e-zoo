module.exports = (sequelize, DataTypes) => {
    const Drugs = sequelize.define("Drugs", {
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
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    
    Drugs.associate = models => {
        Drugs.belongsTo(models.Prods, { foreignKey: 'prodId' });
    };

    return Drugs;
};