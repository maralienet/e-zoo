const express = require('express');
const router = express.Router();

const { Aquariums } = require('../models');

router.get("/", async (req, res) => {
    let query = req.query;
    let listOfAquariums;

    if (Object.keys(query).length === 0)
        listOfAquariums = await Aquariums.findAll();
    else
        listOfAquariums = await Aquariums.findAll({ where: query });
    res.json(listOfAquariums);
});

router.post("/", async (req, res) => {
    const aquarium = req.body;
    await Aquariums.create(aquarium);
    res.json(aquarium);
});

module.exports = router;