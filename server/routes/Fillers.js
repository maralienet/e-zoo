const express = require('express');
const router = express.Router();

const { Fillers } = require('../models');

router.get("/", async (req, res) => {
    let query = req.query;
    let listOfFillers;

    if (Object.keys(query).length === 0)
        listOfFillers = await Fillers.findAll();
    else
        listOfFillers = await Fillers.findAll({ where: query });
    res.json(listOfFillers);
});

router.post("/", async (req, res) => {
    const filler = req.body;
    await Fillers.create(filler);
    res.json(filler);
});

module.exports = router;