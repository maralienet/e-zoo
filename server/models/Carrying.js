module.exports = (sequelize, DataTypes) => {
    const Carrying = sequelize.define("Carrying", {
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
        petSize: {
            type: DataTypes.STRING,
            allowNull: false
        },
        material: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    
    Carrying.associate = models => {
        Carrying.belongsTo(models.Prods, { foreignKey: 'prodId' });
    };

    return Carrying;
};