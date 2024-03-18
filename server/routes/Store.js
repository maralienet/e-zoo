const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const { Prods, Store } = require('../models');

router.get("/", async (req, res) => {
    let query = req.query;
    let list;

    if (Object.keys(query).length === 0)
        list = await Store.findAll({
            include: [
                {
                    model: Prods,
                    where: { prodId: Sequelize.col('prod.id') }
                }
            ],
        });
    else
        list = await Store.findAll({
            where: query,
            include: [
                {
                    model: Prods,
                    required: false
                }
            ],
        });
    res.json(list);
});

router.post("/", async (req, res) => {
    const item = req.body;
    const createdItem = await Store.create(item);
    res.json(createdItem);
});

module.exports = router;