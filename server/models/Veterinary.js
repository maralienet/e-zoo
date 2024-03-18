module.exports = (sequelize, DataTypes) => {
    const Veterinary = sequelize.define("Veterinary", {
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
            type: DataTypes.STRING,
            allowNull: false
        },
        testimony: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    
    Veterinary.associate = models => {
        Veterinary.belongsTo(models.Prods, { foreignKey: 'prodId' });
    };

    return Veterinary;
};