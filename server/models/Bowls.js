module.exports = (sequelize, DataTypes) => {
    const Bowls = sequelize.define("Bowls", {
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
        petAge: {
            type: DataTypes.STRING,
            allowNull: false
        },
        material: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    
    Bowls.associate = models => {
        Bowls.belongsTo(models.Prods, { foreignKey: 'prodId' });
    };

    return Bowls;
};