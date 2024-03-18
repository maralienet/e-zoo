module.exports = (sequelize, DataTypes) => {
    const Cages = sequelize.define("Cages", {
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
        },
        colour: {
            type: DataTypes.STRING,
            allowNull: false
        },
        material: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    
    Cages.associate = models => {
        Cages.belongsTo(models.Prods, { foreignKey: 'prodId' });
    };

    return Cages;
};