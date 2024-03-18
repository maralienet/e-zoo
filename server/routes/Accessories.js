const express = require('express');
const router = express.Router();

const { Accessories } = require('../models');

router.get("/", async (req, res) => {
    let query = req.query;
    let listOfAccessories;

    if (Object.keys(query).length === 0)
        listOfAccessories = await Accessories.findAll();
    else
        listOfAccessories = await Accessories.findAll({ where: query });
    res.json(listOfAccessories);
});

router.post("/", async (req, res) => {
    const accessory = req.body;
    await Accessories.create(accessory);
    res.json(accessory);
});

module.exports = router;