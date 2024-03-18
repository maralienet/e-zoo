const express = require('express');
const router = express.Router();

const { Bowls } = require('../models');

router.get("/", async (req, res) => {
    let query = req.query;
    let listOfBowls;

    if (Object.keys(query).length === 0)
        listOfBowls = await Bowls.findAll();
    else
        listOfBowls = await Bowls.findAll({ where: query });
    res.json(listOfBowls);
});

router.post("/", async (req, res) => {
    const bowl = req.body;
    await Bowls.create(bowl);
    res.json(bowl);
});

module.exports = router;