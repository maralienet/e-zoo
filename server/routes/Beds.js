const express = require('express');
const router = express.Router();

const { Beds } = require('../models');

router.get("/", async (req, res) => {
    let query = req.query;
    let listOfBeds;

    if (Object.keys(query).length === 0)
        listOfBeds = await Beds.findAll();
    else
        listOfBeds = await Beds.findAll({ where: query });
    res.json(listOfBeds);
});

router.post("/", async (req, res) => {
    const bed = req.body;
    await Beds.create(bed);
    res.json(bed);
});

module.exports = router;