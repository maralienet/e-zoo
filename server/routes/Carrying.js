const express = require('express');
const router = express.Router();

const { Carrying } = require('../models');

router.get("/", async (req, res) => {
    let query = req.query;
    let listOfCarrying;

    if (Object.keys(query).length === 0)
        listOfCarrying = await Carrying.findAll();
    else
        listOfCarrying = await Carrying.findAll({ where: query });
    res.json(listOfCarrying);
});

router.post("/", async (req, res) => {
    const carry = req.body;
    await Carrying.create(carry);
    res.json(carry);
});

module.exports = router;