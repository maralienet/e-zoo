const express = require('express');
const router = express.Router();

const { Veterinary } = require('../models');

router.get("/", async (req, res) => {
    let query = req.query;
    let listOfVeterinary;

    if (Object.keys(query).length === 0)
        listOfVeterinary = await Veterinary.findAll();
    else
        listOfVeterinary = await Veterinary.findAll({ where: query });
    res.json(listOfVeterinary);
});

router.post("/", async (req, res) => {
    const user = req.body;
    await Veterinary.create(user);
    res.json(user);
});

module.exports = router;