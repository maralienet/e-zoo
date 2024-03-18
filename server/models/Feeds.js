module.exports = (sequelize, DataTypes) => {
    const Feeds = sequelize.define("Feeds", {
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
        isDiet: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weight: {
            type: DataTypes.FLOAT,
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
        flavour: {
            type: DataTypes.STRING,
            allowNull: false
        },
        classification: {
            type: DataTypes.STRING,
            allowNull: false
        },
        composition: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    
    Feeds.associate = models => {
        Feeds.belongsTo(models.Prods, { foreignKey: 'prodId' });
    };
    
    return Feeds;
};