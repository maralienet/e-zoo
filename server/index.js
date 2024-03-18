const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

//DB
const db = require('./models');
const { sequelize, Sequelize } = db;
const DataTypes = Sequelize.DataTypes;

const Users = require('./models/Users')(sequelize, DataTypes);
const Admins = require('./models/Admins')(sequelize, DataTypes);

const Prods = require('./models/Prods')(sequelize, DataTypes);
const Feeds = require('./models/Feeds')(sequelize, DataTypes);
const Bowls = require('./models/Bowls')(sequelize, DataTypes);
const Beds = require('./models/Beds')(sequelize, DataTypes);
const Toys = require('./models/Toys')(sequelize, DataTypes);
const Accessories = require('./models/Accessories')(sequelize, DataTypes);
const Fillers = require('./models/Fillers')(sequelize, DataTypes);
const Carrying = require('./models/Carrying')(sequelize, DataTypes);
const Cages = require('./models/Cages')(sequelize, DataTypes);
const Aquariums = require('./models/Aquariums')(sequelize, DataTypes);
const Drugs = require('./models/Drugs')(sequelize, DataTypes);
const Veterinary = require('./models/Veterinary')(sequelize, DataTypes);

const Cart = require('./models/Cart')(sequelize, DataTypes);

const Orders = require('./models/Orders')(sequelize, DataTypes);

const Store = require('./models/Store')(sequelize, DataTypes);
const Delivery = require('./models/Delivery')(sequelize, DataTypes);

const petTypes = require('./models/petTypes')(sequelize, DataTypes);
const models = {
    Users: Users,
    Admins: Admins,
    Prods: Prods,
    Feeds: Feeds,
    Bowls: Bowls,
    Beds: Beds,
    Toys: Toys,
    Carrying: Carrying,
    Fillers: Fillers,
    Accessories: Accessories,
    Cages: Cages,
    Aquariums: Aquariums,
    Drugs: Drugs,
    Veterinary: Veterinary,
    petTypes: petTypes,
    Cart: Cart,
    Orders: Orders,
    Store: Store,
    Delivery: Delivery,
};

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

//Routers
const usersRouter = require('./routes/Users');
app.use("/users", usersRouter);

const prodsRouter = require('./routes/Prods');
app.use("/prods", prodsRouter);

const accessoriesRouter = require('./routes/Accessories');
app.use("/accessories", accessoriesRouter);

const aquariumsRouter = require('./routes/Aquariums');
app.use("/aquariums", aquariumsRouter);

const bedsRouter = require('./routes/Beds');
app.use("/beds", bedsRouter);

const bowlsRouter = require('./routes/Bowls');
app.use("/bowls", bowlsRouter);

const cagesRouter = require('./routes/Cages');
app.use("/cages", cagesRouter);

const carryingRouter = require('./routes/Carrying');
app.use("/carrying", carryingRouter);

const drugsRouter = require('./routes/Drugs');
app.use("/drugs", drugsRouter);

const feedsRouter = require('./routes/Feeds');
app.use("/feeds", feedsRouter);

const fillersRouter = require('./routes/Fillers');
app.use("/fillers", fillersRouter);

const toysRouter = require('./routes/Toys');
app.use("/toys", toysRouter);

const veterinaryRouter = require('./routes/Veterinary');
app.use("/veterinary", veterinaryRouter);

const cartRouter = require('./routes/Cart');
app.use("/cart", cartRouter);

const ordersRouter = require('./routes/Orders');
app.use("/orders", ordersRouter);

const storeRouter = require('./routes/Store');
app.use("/store", storeRouter);

const deliveryRouter = require('./routes/Delivery');
app.use("/delivery", deliveryRouter);

const excelRouter = require('./routes/Excel');
app.use("/excel", excelRouter);

const pdfRouter = require('./routes/Pdf');
app.use("/pdf", pdfRouter);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('serv is running on 3001');
    });
});



