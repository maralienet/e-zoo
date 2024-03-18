module.exports = (sequelize, DataTypes) => {
    const Prods = sequelize.define("Prods", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        available: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        petTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Prods.associate = models => {
        models.Prods.hasOne(models.Feeds, { foreignKey: 'prodId' });
        models.Prods.hasOne(models.Bowls, { foreignKey: 'prodId' });
        models.Prods.hasOne(models.Beds, { foreignKey: 'prodId' });
        models.Prods.hasOne(models.Toys, { foreignKey: 'prodId' });
        models.Prods.hasOne(models.Carrying, { foreignKey: 'prodId' });
        models.Prods.hasOne(models.Fillers, { foreignKey: 'prodId' });
        models.Prods.hasOne(models.Accessories, { foreignKey: 'prodId' });
        models.Prods.hasOne(models.Cages, { foreignKey: 'prodId' });
        models.Prods.hasOne(models.Aquariums, { foreignKey: 'prodId' });
        models.Prods.hasOne(models.Drugs, { foreignKey: 'prodId' });
        models.Prods.hasOne(models.Veterinary, { foreignKey: 'prodId' });
        models.Prods.hasOne(models.Store, { foreignKey: 'prodId' });
        models.Prods.hasMany(models.Cart, { foreignKey: 'prodId' });
        models.Prods.hasMany(models.Delivery, { foreignKey: 'prodId' });
        
        models.Prods.belongsTo(models.petTypes, { foreignKey: 'petTypeId' });
    };

    return Prods;
};