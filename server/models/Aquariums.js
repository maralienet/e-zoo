module.exports = (sequelize, DataTypes) => {
    const Aquariums = sequelize.define("Aquariums", {
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
        volume: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        form: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    
    Aquariums.associate = models => {
        Aquariums.belongsTo(models.Prods, { foreignKey: 'prodId' });
    };

    return Aquariums;
};