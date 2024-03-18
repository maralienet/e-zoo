module.exports = (sequelize, DataTypes) => {
    const Fillers = sequelize.define("Fillers", {
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
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        composition: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    
    Fillers.associate = models => {
        Fillers.belongsTo(models.Prods, { foreignKey: 'prodId' });
    };

    return Fillers;
};