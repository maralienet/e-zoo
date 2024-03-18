const express = require('express');
const router = express.Router();

const { Feeds } = require('../models');

router.get("/", async (req, res) => {
    let query = req.query;
    let listOfFeeds;

    if (Object.keys(query).length === 0)
        listOfFeeds = await Feeds.findAll();
    else
        listOfFeeds = await Feeds.findAll({ where: query });
    res.json(listOfFeeds);
});

router.post("/", async (req, res) => {
    const feed = req.body;
    await Feeds.create(feed);
    res.json(feed);
});

module.exports = router;