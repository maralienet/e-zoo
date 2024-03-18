const express = require('express');
const router = express.Router();

const { Drugs } = require('../models');

router.get("/", async (req, res) => {
    let query = req.query;
    let listOfDrugs;

    if (Object.keys(query).length === 0)
        listOfDrugs = await Drugs.findAll();
    else
        listOfDrugs = await Drugs.findAll({ where: query });
    res.json(listOfDrugs);
});

router.post("/", async (req, res) => {
    const drug = req.body;
    await Drugs.create(drug);
    res.json(drug);
});

module.exports = router;