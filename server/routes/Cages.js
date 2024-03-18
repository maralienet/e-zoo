const express = require('express');
const router = express.Router();

const { Cages } = require('../models');

router.get("/", async (req, res) => {
    let query = req.query;
    let listOfCages;

    if (Object.keys(query).length === 0)
        listOfCages = await Cages.findAll();
    else
        listOfCages = await Cages.findAll({ where: query });
    res.json(listOfCages);
});

router.post("/", async (req, res) => {
    const cage = req.body;
    await Cages.create(cage);
    res.json(cage);
});

module.exports = router;