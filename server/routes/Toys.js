const express = require('express');
const router = express.Router();

const { Toys } = require('../models');

router.get("/", async (req, res) => {
    let query = req.query;
    let listOfToys;

    if (Object.keys(query).length === 0)
        listOfToys = await Toys.findAll();
    else
        listOfToys = await Toys.findAll({ where: query });
    res.json(listOfToys);
});

router.post("/", async (req, res) => {
    const toy = req.body;
    await Toys.create(toy);
    res.json(toy);
});

module.exports = router;