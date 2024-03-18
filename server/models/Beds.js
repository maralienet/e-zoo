module.exports = (sequelize, DataTypes) => {
    const Beds = sequelize.define("Beds", {
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
        petAge: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        composition: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    
    Beds.associate = models => {
        Beds.belongsTo(models.Prods, { foreignKey: 'prodId' });
    };

    return Beds;
};