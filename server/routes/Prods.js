const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const { Prods, Store, Feeds, Bowls, Beds, Fillers, Toys, Carrying, Accessories, Cages, Aquariums, Drugs, Veterinary } = require('../models');

router.get("/", async (req, res) => {
    let query = req.query;
    let listOfProds;

    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            include: [
                {
                    model: Store,
                    where: { id: Sequelize.col('prodId') }
                }
            ]
        });
    else
        listOfProds = await Prods.findAll({
            where: query,
            include: [
                {
                    model: Store,
                    where: { id: Sequelize.col('prodId') }
                }
            ]
        });
    res.json(listOfProds);
});

//dog 

//diet
router.get("/dog/diet-korm", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Диетический Корм', petTypeId: 1 },
            include: [
                {
                    model: Feeds,
                    where: { id: Sequelize.col('prodId') }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Диетический Корм',
                    petTypeId: 1,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Диетический Корм',
                    petTypeId: 1,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Диетический Корм', petTypeId: 1 },
                include: [
                    {
                        model: Feeds,
                        where: { id: Sequelize.col('prodId') }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/dog/diet-korm/brands", async (req, res) => {
    let result = await Prods.findAll({
        attributes: [
            'brand',
            [Sequelize.fn('COUNT', Sequelize.col('brand')), 'count']
        ],
        where: { type: 'Диетический Корм', petTypeId: 1 },
        group: ['brand']
    });
    res.json(result);
});
router.get("/dog/diet-korm/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Диетический Корм' and petTypeId=1 
    group by weight;
    `);
    res.json(result);
});
router.get("/dog/diet-korm/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Диетический Корм' and petTypeId=1 
    group by petAge;
    `);
    res.json(result);
});
router.get("/dog/diet-korm/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Диетический Корм' AND petTypeId=1
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);

    res.json(result);
});


router.get("/dog/diet-korm/diet-dry-korm", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Диетический Корм', petTypeId: 1 },
            include: [
                {
                    model: Feeds,
                    where: {
                        id: Sequelize.col('prodId'),
                        type: 'Диетический сухой корм'
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Диетический Корм',
                    petTypeId: 1,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Диетический сухой корм'
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Диетический Корм',
                    petTypeId: 1,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Диетический сухой корм'
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Диетический Корм', petTypeId: 1 },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Диетический сухой корм'
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/dog/diet-korm/diet-dry-korm/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Диетический Корм' and petTypeId=1 and feeds.type='Диетический сухой корм'
    group by brand;
    `);
    res.json(result);
});
router.get("/dog/diet-korm/diet-dry-korm/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Диетический Корм' and petTypeId=1 and feeds.type='Диетический сухой корм'
    group by weight;
    `);
    res.json(result);
});
router.get("/dog/diet-korm/diet-dry-korm/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Диетический Корм' and petTypeId=1 and feeds.type='Диетический сухой корм' 
    group by petAge;
    `);
    res.json(result);
});
router.get("/dog/diet-korm/diet-dry-korm/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Диетический Корм' AND petTypeId=1 and feeds.type='Диетический сухой корм'
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);
    res.json(result);
});


router.get("/dog/diet-korm/konservy-diet", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Диетический Корм', petTypeId: 1 },
            include: [
                {
                    model: Feeds,
                    where: {
                        id: Sequelize.col('prodId'),
                        type: 'Консервы диетические'
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Диетический Корм',
                    petTypeId: 1,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Консервы диетические'
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Диетический Корм',
                    petTypeId: 1,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Консервы диетические'
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Диетический Корм', petTypeId: 1 },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Консервы диетические'
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/dog/diet-korm/konservy-diet/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Диетический Корм' and petTypeId=1 and feeds.type='Консервы диетические'
    group by brand;
    `);
    res.json(result);
});
router.get("/dog/diet-korm/konservy-diet/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Диетический Корм' and petTypeId=1 and feeds.type='Консервы диетические'
    group by weight;
    `);
    res.json(result);
});
router.get("/dog/diet-korm/konservy-diet/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Диетический Корм' and petTypeId=1 and feeds.type='Консервы диетические' 
    group by petAge;
    `);
    res.json(result);
});
router.get("/dog/diet-korm/konservy-diet/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Диетический Корм' AND petTypeId=1 and feeds.type='Консервы диетические'
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);
    res.json(result);
});


router.get("/dog/diet-korm/preservy-diet", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Диетический Корм', petTypeId: 1 },
            include: [
                {
                    model: Feeds,
                    where: {
                        id: Sequelize.col('prodId'),
                        type: 'Пресервы диетические'
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Диетический Корм',
                    petTypeId: 1,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Пресервы диетические'
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Диетический Корм',
                    petTypeId: 1,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Пресервы диетические'
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Диетический Корм', petTypeId: 1 },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Пресервы диетические'
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/dog/diet-korm/preservy-diet/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Диетический Корм' and petTypeId=1 and feeds.type='Пресервы диетические'
    group by brand;
    `);
    res.json(result);
});
router.get("/dog/diet-korm/preservy-diet/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Диетический Корм' and petTypeId=1 and feeds.type='Пресервы диетические'
    group by weight;
    `);
    res.json(result);
});
router.get("/dog/diet-korm/preservy-diet/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Диетический Корм' and petTypeId=1 and feeds.type='Пресервы диетические' 
    group by petAge;
    `);
    res.json(result);
});
router.get("/dog/diet-korm/preservy-diet/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Диетический Корм' AND petTypeId=1 and feeds.type='Пресервы диетические'
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);
    res.json(result);
});

//korm
router.get("/dog/korm", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Корм', petTypeId: 1 },
            include: [
                {
                    model: Feeds,
                    where: { id: Sequelize.col('prodId') }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 1,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 1,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Корм', petTypeId: 1 },
                include: [
                    {
                        model: Feeds,
                        where: { id: Sequelize.col('prodId') }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/dog/korm/brands", async (req, res) => {
    let result = await Prods.findAll({
        attributes: [
            'brand',
            [Sequelize.fn('COUNT', Sequelize.col('brand')), 'count']
        ],
        where: { type: 'Корм', petTypeId: 1 },
        group: ['brand']
    });
    res.json(result);
});
router.get("/dog/korm/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=1 
    group by weight;
    `);
    res.json(result);
});
router.get("/dog/korm/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=1 
    group by petAge;
    `);
    res.json(result);
});
router.get("/dog/korm/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Корм' AND petTypeId=1
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);

    res.json(result);
});


router.get("/dog/korm/dry-korm", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Корм', petTypeId: 1 },
            include: [
                {
                    model: Feeds,
                    where: {
                        id: Sequelize.col('prodId'),
                        type: 'Сухой корм'
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 1,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Сухой корм'
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 1,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Сухой корм'
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Корм', petTypeId: 1 },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Сухой корм'
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/dog/korm/dry-korm/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=1 and feeds.type='Сухой корм'
    group by brand;
    `);
    res.json(result);
});
router.get("/dog/korm/dry-korm/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=1 and feeds.type='Сухой корм'
    group by weight;
    `);
    res.json(result);
});
router.get("/dog/korm/dry-korm/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=1 and feeds.type='Сухой корм' 
    group by petAge;
    `);
    res.json(result);
});
router.get("/dog/korm/dry-korm/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Корм' AND petTypeId=1 and feeds.type='Сухой корм'
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);
    res.json(result);
});

router.get("/dog/korm/konservy", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Корм', petTypeId: 1 },
            include: [
                {
                    model: Feeds,
                    where: {
                        id: Sequelize.col('prodId'),
                        type: 'Консервы'
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 1,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Консервы'
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 1,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Консервы'
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Корм', petTypeId: 1 },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Консервы'
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/dog/korm/konservy/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=1 and feeds.type='Консервы'
    group by brand;
    `);
    res.json(result);
});
router.get("/dog/korm/konservy/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=1 and feeds.type='Консервы'
    group by weight;
    `);
    res.json(result);
});
router.get("/dog/korm/konservy/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=1 and feeds.type='Консервы' 
    group by petAge;
    `);
    res.json(result);
});
router.get("/dog/korm/konservy/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Корм' AND petTypeId=1 and feeds.type='Консервы'
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);
    res.json(result);
});


router.get("/dog/korm/preservy", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Корм', petTypeId: 1 },
            include: [
                {
                    model: Feeds,
                    where: {
                        id: Sequelize.col('prodId'),
                        type: 'Пресервы'
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 1,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Пресервы'
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 1,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Пресервы'
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Корм', petTypeId: 1 },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Пресервы'
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/dog/korm/preservy/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=1 and feeds.type='Пресервы'
    group by brand;
    `);
    res.json(result);
});
router.get("/dog/korm/preservy/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=1 and feeds.type='Пресервы'
    group by weight;
    `);
    res.json(result);
});
router.get("/dog/korm/preservy/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=1 and feeds.type='Пресервы' 
    group by petAge;
    `);
    res.json(result);
});
router.get("/dog/korm/preservy/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Корм' AND petTypeId=1 and feeds.type='Пресервы'
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);
    res.json(result);
});

router.get("/dog/korm/lakomstva", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Корм', petTypeId: 1 },
            include: [
                {
                    model: Feeds,
                    where: {
                        id: Sequelize.col('prodId'),
                        type: 'Лакомства и витамины'
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 1,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Лакомства и витамины'
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 1,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Лакомства и витамины'
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Корм', petTypeId: 1 },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Лакомства и витамины'
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/dog/korm/lakomstva/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=1 and feeds.type='Лакомства и витамины'
    group by brand;
    `);
    res.json(result);
});
router.get("/dog/korm/lakomstva/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=1 and feeds.type='Лакомства и витамины'
    group by weight;
    `);
    res.json(result);
});
router.get("/dog/korm/lakomstva/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=1 and feeds.type='Лакомства и витамины' 
    group by petAge;
    `);
    res.json(result);
});
router.get("/dog/korm/lakomstva/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Корм' AND petTypeId=1 and feeds.type='Лакомства и витамины'
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);
    res.json(result);
});

//soderzhanie-i-ukhod
router.get("/dog/soderzhanie-i-ukhod", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Содержание и уход', petTypeId: 1 },
            include: [
                {
                    model: Bowls,
                    required: false
                },
                {
                    model: Beds,
                    required: false
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 1,
                    id: query.id,
                },
                include: [
                    {
                        model: Bowls,
                        required: false
                    },
                    {
                        model: Beds,
                        required: false
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 1,
                    available: query.available
                },
                include: [
                    {
                        model: Bowls,
                        required: false
                    },
                    {
                        model: Beds,
                        required: false
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Содержание и уход', petTypeId: 1 },
                include: [
                    {
                        model: Bowls,
                        required: false
                    },
                    {
                        model: Beds,
                        required: false
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/dog/soderzhanie-i-ukhod/brands", async (req, res) => {
    let result = await Prods.findAll({
        attributes: [
            'brand',
            [Sequelize.fn('COUNT', Sequelize.col('brand')), 'count']
        ],
        where: { type: 'Содержание и уход', petTypeId: 1 },
        group: ['brand']
    });
    res.json(result);
});
router.get("/dog/soderzhanie-i-ukhod/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT COALESCE(bowls.petAge, beds.petAge) as petAge, COUNT(*) as count 
    FROM prods 
    LEFT JOIN beds ON prods.id=beds.prodId 
    LEFT JOIN bowls ON prods.id=bowls.prodId 
    WHERE petTypeId=1 AND prods.type='Содержание и уход' 
    GROUP BY COALESCE(bowls.petAge, beds.petAge);
    `);
    res.json(result);
});

router.get("/dog/soderzhanie-i-ukhod/domiki-i-lezhaki", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Содержание и уход', petTypeId: 1 },
            include: [
                {
                    model: Beds,
                    where: {
                        id: Sequelize.col('prodId')
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 1,
                    id: query.id,
                },
                include: [
                    {
                        model: Beds,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 1,
                    available: query.available
                },
                include: [
                    {
                        model: Beds,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Содержание и уход', petTypeId: 1 },
                include: [
                    {
                        model: Beds,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/dog/soderzhanie-i-ukhod/domiki-i-lezhaki/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT brand, COUNT(*) as count 
    FROM prods 
    JOIN beds ON prods.id=beds.prodId 
    WHERE petTypeId=1 AND prods.type='Содержание и уход' 
    GROUP BY brand;
    `);
    res.json(result);
});
router.get("/dog/soderzhanie-i-ukhod/domiki-i-lezhaki/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT petAge, COUNT(*) as count 
    FROM prods 
    JOIN beds ON prods.id=beds.prodId 
    WHERE petTypeId=1 AND prods.type='Содержание и уход' 
    GROUP BY petAge;
    `);
    res.json(result);
});

router.get("/dog/soderzhanie-i-ukhod/igrushki", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Содержание и уход', petTypeId: 1 },
            include: [
                {
                    model: Toys,
                    where: {
                        id: Sequelize.col('prodId')
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 1,
                    id: query.id,
                },
                include: [
                    {
                        model: Toys,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 1,
                    available: query.available
                },
                include: [
                    {
                        model: Toys,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Содержание и уход', petTypeId: 1 },
                include: [
                    {
                        model: Toys,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/dog/soderzhanie-i-ukhod/igrushki/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT brand, COUNT(*) as count 
    FROM prods 
    JOIN Toys ON prods.id=Toys.prodId 
    WHERE petTypeId=1 AND prods.type='Содержание и уход' 
    GROUP BY brand;
    `);
    res.json(result);
});

router.get("/dog/soderzhanie-i-ukhod/transportirovka-perenoski-budki", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Содержание и уход', petTypeId: 1 },
            include: [
                {
                    model: Carrying,
                    where: {
                        id: Sequelize.col('prodId')
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 1,
                    id: query.id,
                },
                include: [
                    {
                        model: Carrying,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 1,
                    available: query.available
                },
                include: [
                    {
                        model: Carrying,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Содержание и уход', petTypeId: 1 },
                include: [
                    {
                        model: Carrying,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/dog/soderzhanie-i-ukhod/transportirovka-perenoski-budki/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT brand, COUNT(*) as count 
    FROM prods 
    JOIN Carryings ON prods.id=Carryings.prodId 
    WHERE petTypeId=1 AND prods.type='Содержание и уход' 
    GROUP BY brand;
    `);
    res.json(result);
});
router.get("/dog/soderzhanie-i-ukhod/transportirovka-perenoski-budki/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT petSize, COUNT(*) as count 
    FROM prods 
    JOIN Carryings ON prods.id=Carryings.prodId 
    WHERE petTypeId=1 AND prods.type='Содержание и уход' 
    GROUP BY petSize;
    `);
    res.json(result);
});

router.get("/dog/soderzhanie-i-ukhod/posuda", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Содержание и уход', petTypeId: 1 },
            include: [
                {
                    model: Bowls,
                    where: {
                        id: Sequelize.col('prodId')
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 1,
                    id: query.id,
                },
                include: [
                    {
                        model: Bowls,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 1,
                    available: query.available
                },
                include: [
                    {
                        model: Bowls,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Содержание и уход', petTypeId: 1 },
                include: [
                    {
                        model: Bowls,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/dog/soderzhanie-i-ukhod/posuda/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT brand, COUNT(*) as count 
    FROM prods 
    JOIN bowls ON prods.id=bowls.prodId 
    WHERE petTypeId=1 AND prods.type='Содержание и уход' 
    GROUP BY brand;
    `);
    res.json(result);
});
router.get("/dog/soderzhanie-i-ukhod/posuda/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT petSize, COUNT(*) as count 
    FROM prods 
    JOIN bowls ON prods.id=bowls.prodId 
    WHERE petTypeId=1 AND prods.type='Содержание и уход' 
    GROUP BY petSize;
    `);
    res.json(result);
});


//cat

//diet-korm
router.get("/cat/diet-korm", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Диетический Корм', petTypeId: 2 },
            include: [
                {
                    model: Feeds,
                    where: { id: Sequelize.col('prodId') }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Диетический Корм',
                    petTypeId: 2,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Диетический Корм',
                    petTypeId: 2,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Диетический Корм', petTypeId: 2 },
                include: [
                    {
                        model: Feeds,
                        where: { id: Sequelize.col('prodId') }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/cat/diet-korm/brands", async (req, res) => {
    let result = await Prods.findAll({
        attributes: [
            'brand',
            [Sequelize.fn('COUNT', Sequelize.col('brand')), 'count']
        ],
        where: { type: 'Диетический Корм', petTypeId: 2 },
        group: ['brand']
    });
    res.json(result);
});
router.get("/cat/diet-korm/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Диетический Корм' and petTypeId=2 
    group by weight;
    `);
    res.json(result);
});
router.get("/cat/diet-korm/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Диетический Корм' and petTypeId=2 
    group by petAge;
    `);
    res.json(result);
});
router.get("/cat/diet-korm/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Диетический Корм' AND petTypeId=2
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);

    res.json(result);
});

router.get("/cat/diet-korm/diet-korm", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Диетический Корм', petTypeId: 2 },
            include: [
                {
                    model: Feeds,
                    where: {
                        id: Sequelize.col('prodId'),
                        type: 'Диетический корм'
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Диетический Корм',
                    petTypeId: 2,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Диетический корм'
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Диетический Корм',
                    petTypeId: 2,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Диетический корм'
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Диетический Корм', petTypeId: 2 },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Диетический корм'
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/cat/diet-korm/diet-korm/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Диетический Корм' and petTypeId=2 and feeds.type='Диетический корм'
    group by brand;
    `);
    res.json(result);
});
router.get("/cat/diet-korm/diet-korm/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Диетический Корм' and petTypeId=2 and feeds.type='Диетический корм'
    group by weight;
    `);
    res.json(result);
});
router.get("/cat/diet-korm/diet-korm/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Диетический Корм' and petTypeId=2 and feeds.type='Диетический корм' 
    group by petAge;
    `);
    res.json(result);
});
router.get("/cat/diet-korm/diet-korm/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Диетический Корм' AND petTypeId=2 and feeds.type='Диетический корм'
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);
    res.json(result);
});


router.get("/cat/diet-korm/konservy-diet", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Диетический Корм', petTypeId: 2 },
            include: [
                {
                    model: Feeds,
                    where: {
                        id: Sequelize.col('prodId'),
                        type: 'Консервы диетические'
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Диетический Корм',
                    petTypeId: 2,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Консервы диетические'
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Диетический Корм',
                    petTypeId: 2,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Консервы диетические'
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Диетический Корм', petTypeId: 2 },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Консервы диетические'
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/cat/diet-korm/konservy-diet/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Диетический Корм' and petTypeId=2 and feeds.type='Консервы диетические'
    group by brand;
    `);
    res.json(result);
});
router.get("/cat/diet-korm/konservy-diet/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Диетический Корм' and petTypeId=2 and feeds.type='Консервы диетические'
    group by weight;
    `);
    res.json(result);
});
router.get("/cat/diet-korm/konservy-diet/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Диетический Корм' and petTypeId=2 and feeds.type='Консервы диетические' 
    group by petAge;
    `);
    res.json(result);
});
router.get("/cat/diet-korm/konservy-diet/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Диетический Корм' AND petTypeId=2 and feeds.type='Консервы диетические'
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);
    res.json(result);
});


router.get("/cat/diet-korm/preservy-diet", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Диетический Корм', petTypeId: 2 },
            include: [
                {
                    model: Feeds,
                    where: {
                        id: Sequelize.col('prodId'),
                        type: 'Пресервы диетические'
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Диетический Корм',
                    petTypeId: 2,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Пресервы диетические'
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Диетический Корм',
                    petTypeId: 2,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Пресервы диетические'
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Диетический Корм', petTypeId: 2 },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Пресервы диетические'
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/cat/diet-korm/preservy-diet/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Диетический Корм' and petTypeId=2 and feeds.type='Пресервы диетические'
    group by brand;
    `);
    res.json(result);
});
router.get("/cat/diet-korm/preservy-diet/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Диетический Корм' and petTypeId=2 and feeds.type='Пресервы диетические'
    group by weight;
    `);
    res.json(result);
});
router.get("cat/cat/diet-korm/preservy-diet/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Диетический Корм' and petTypeId=2 and feeds.type='Пресервы диетические' 
    group by petAge;
    `);
    res.json(result);
});
router.get("/cat/diet-korm/preservy-diet/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Диетический Корм' AND petTypeId=2 and feeds.type='Пресервы диетические'
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);
    res.json(result);
});

//korm
router.get("/cat/korm", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Корм', petTypeId: 2 },
            include: [
                {
                    model: Feeds,
                    where: { id: Sequelize.col('prodId') }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 2,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 2,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Корм', petTypeId: 2 },
                include: [
                    {
                        model: Feeds,
                        where: { id: Sequelize.col('prodId') }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/cat/korm/brands", async (req, res) => {
    let result = await Prods.findAll({
        attributes: [
            'brand',
            [Sequelize.fn('COUNT', Sequelize.col('brand')), 'count']
        ],
        where: { type: 'Корм', petTypeId: 2 },
        group: ['brand']
    });
    res.json(result);
});
router.get("/cat/korm/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=2 
    group by weight;
    `);
    res.json(result);
});
router.get("/cat/korm/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=2 
    group by petAge;
    `);
    res.json(result);
});
router.get("/cat/korm/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Корм' AND petTypeId=2
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);
    res.json(result);
});


router.get("/cat/korm/dry-korm", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Корм', petTypeId: 2 },
            include: [
                {
                    model: Feeds,
                    where: {
                        id: Sequelize.col('prodId'),
                        type: 'Сухой корм'
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 2,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Сухой корм'
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 2,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Сухой корм'
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Корм', petTypeId: 2 },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Сухой корм'
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/cat/korm/dry-korm/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=2 and feeds.type='Сухой корм'
    group by brand;
    `);
    res.json(result);
});
router.get("/cat/korm/dry-korm/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=2 and feeds.type='Сухой корм'
    group by weight;
    `);
    res.json(result);
});
router.get("/cat/korm/dry-korm/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=2 and feeds.type='Сухой корм' 
    group by petAge;
    `);
    res.json(result);
});
router.get("/cat/korm/dry-korm/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Корм' AND petTypeId=2 and feeds.type='Сухой корм'
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);
    res.json(result);
});

router.get("/cat/korm/konservy", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Корм', petTypeId: 2 },
            include: [
                {
                    model: Feeds,
                    where: {
                        id: Sequelize.col('prodId'),
                        type: 'Консервы'
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 2,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Консервы'
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 2,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Консервы'
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Корм', petTypeId: 2 },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Консервы'
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/cat/korm/konservy/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=2 and feeds.type='Консервы'
    group by brand;
    `);
    res.json(result);
});
router.get("/cat/korm/konservy/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=2 and feeds.type='Консервы'
    group by weight;
    `);
    res.json(result);
});
router.get("/cat/korm/konservy/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=2 and feeds.type='Консервы' 
    group by petAge;
    `);
    res.json(result);
});
router.get("/cat/korm/konservy/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Корм' AND petTypeId=2 and feeds.type='Консервы'
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);
    res.json(result);
});

router.get("/cat/korm/preservy", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Корм', petTypeId: 2 },
            include: [
                {
                    model: Feeds,
                    where: {
                        id: Sequelize.col('prodId'),
                        type: 'Пресервы'
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 2,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Пресервы'
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 2,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Пресервы'
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Корм', petTypeId: 2 },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Пресервы'
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/cat/korm/preservy/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=2 and feeds.type='Пресервы'
    group by brand;
    `);
    res.json(result);
});
router.get("/cat/korm/preservy/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=2 and feeds.type='Пресервы'
    group by weight;
    `);
    res.json(result);
});
router.get("/cat/korm/preservy/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=2 and feeds.type='Пресервы' 
    group by petAge;
    `);
    res.json(result);
});
router.get("/cat/korm/preservy/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Корм' AND petTypeId=2 and feeds.type='Пресервы'
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);
    res.json(result);
});

router.get("/cat/korm/lakomstva", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Корм', petTypeId: 2 },
            include: [
                {
                    model: Feeds,
                    where: {
                        id: Sequelize.col('prodId'),
                        type: 'Лакомства и витамины'
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 2,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Лакомства и витамины'
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 2,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Лакомства и витамины'
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Корм', petTypeId: 2 },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Лакомства и витамины'
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/cat/korm/lakomstva/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=2 and feeds.type='Лакомства и витамины'
    group by brand;
    `);
    res.json(result);
});
router.get("/cat/korm/lakomstva/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=2 and feeds.type='Лакомства и витамины'
    group by weight;
    `);
    res.json(result);
});
router.get("/cat/korm/lakomstva/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=2 and feeds.type='Лакомства и витамины' 
    group by petAge;
    `);
    res.json(result);
});
router.get("/cat/korm/lakomstva/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Корм' AND petTypeId=2 and feeds.type='Лакомства и витамины'
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);
    res.json(result);
});


//napolniteli
router.get("/cat/napolniteli", async (req, res) => {
    let listOfProds = await Prods.findAll({
        where: { type: 'Наполнители', petTypeId: 2 },
        include: [
            {
                model: Fillers,
                where: { id: Sequelize.col('prodId') }
            }
        ]
    });
    res.json(listOfProds);
});
router.get("/cat/napolniteli/brands", async (req, res) => {
    let result = await Prods.findAll({
        attributes: [
            'brand',
            [Sequelize.fn('COUNT', Sequelize.col('brand')), 'count']
        ],
        where: { type: 'Наполнители', petTypeId: 2 },
        group: ['brand']
    });
    res.json(result);
});
router.get("/cat/napolniteli/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join fillers on fillers.prodId=prods.id 
    where prods.type='Наполнители' and petTypeId=2 
    group by weight;
    `);
    res.json(result);
});

router.get("/cat/napolniteli/drevesnyy", async (req, res) => {
    let listOfProds = await Prods.findAll({
        where: { type: 'Наполнители', petTypeId: 2 },
        include: [
            {
                model: Fillers,
                where: {
                    id: Sequelize.col('prodId'),
                    type: 'Древесный'
                }
            }
        ]
    });
    res.json(listOfProds);
});
router.get("/cat/napolniteli/drevesnyy/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods 
    join fillers on fillers.prodId=prods.id 
    where prods.type='Наполнители' and petTypeId=2 and fillers.type='Древесный'
    group by brand;
    `);
    res.json(result);
});
router.get("/cat/napolniteli/drevesnyy/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join fillers on fillers.prodId=prods.id 
    where prods.type='Наполнители' and petTypeId=2 and fillers.type='Древесный'
    group by weight;
    `);
    res.json(result);
});

router.get("/cat/napolniteli/komkuyushchiysya", async (req, res) => {
    let listOfProds = await Prods.findAll({
        where: { type: 'Наполнители', petTypeId: 2 },
        include: [
            {
                model: Fillers,
                where: {
                    id: Sequelize.col('prodId'),
                    type: 'Комкующийся'
                }
            }
        ]
    });
    res.json(listOfProds);
});
router.get("/cat/napolniteli/komkuyushchiysya/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods 
    join fillers on fillers.prodId=prods.id 
    where prods.type='Наполнители' and petTypeId=2 and fillers.type='Комкующийся'
    group by brand;
    `);
    res.json(result);
});
router.get("/cat/napolniteli/komkuyushchiysya/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join fillers on fillers.prodId=prods.id 
    where prods.type='Наполнители' and petTypeId=2 and fillers.type='Комкующийся'
    group by weight;
    `);
    res.json(result);
});

router.get("/cat/napolniteli/silikagelevyy", async (req, res) => {
    let listOfProds = await Prods.findAll({
        where: { type: 'Наполнители', petTypeId: 2 },
        include: [
            {
                model: Fillers,
                where: {
                    id: Sequelize.col('prodId'),
                    type: 'Силикагелевый'
                }
            }
        ]
    });
    res.json(listOfProds);
});
router.get("/cat/napolniteli/silikagelevyy/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods 
    join fillers on fillers.prodId=prods.id 
    where prods.type='Наполнители' and petTypeId=2 and fillers.type='Силикагелевый'
    group by brand;
    `);
    res.json(result);
});
router.get("/cat/napolniteli/silikagelevyy/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join fillers on fillers.prodId=prods.id 
    where prods.type='Наполнители' and petTypeId=2 and fillers.type='Силикагелевый'
    group by weight;
    `);
    res.json(result);
});

router.get("/cat/napolniteli/soevye", async (req, res) => {
    let listOfProds = await Prods.findAll({
        where: { type: 'Наполнители', petTypeId: 2 },
        include: [
            {
                model: Fillers,
                where: {
                    id: Sequelize.col('prodId'),
                    type: 'Соевые'
                }
            }
        ]
    });
    res.json(listOfProds);
});
router.get("/cat/napolniteli/soevye/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods 
    join fillers on fillers.prodId=prods.id 
    where prods.type='Наполнители' and petTypeId=2 and fillers.type='Соевые'
    group by brand;
    `);
    res.json(result);
});
router.get("/cat/napolniteli/soevye/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join fillers on fillers.prodId=prods.id 
    where prods.type='Наполнители' and petTypeId=2 and fillers.type='Соевые'
    group by weight;
    `);
    res.json(result);
});

//soderzhanie-i-ukhod
router.get("/cat/soderzhanie-i-ukhod", async (req, res) => {
    let listOfProds = await Prods.findAll({
        where: { type: 'Содержание и уход', petTypeId: 2 },
        include: [
            {
                model: Beds,
                where: { id: Sequelize.col('Bed.prodId') },
                required: false
            },
            {
                model: Toys,
                where: { id: Sequelize.col('Toy.prodId') },
                required: false
            },
            {
                model: Bowls,
                where: { id: Sequelize.col('Bowl.prodId') },
                required: false
            },
            {
                model: Carrying,
                where: { id: Sequelize.col('Carrying.prodId') },
                required: false
            }
        ]
    });
    res.json(listOfProds);
});
router.get("/cat/soderzhanie-i-ukhod/brands", async (req, res) => {
    let result = await Prods.findAll({
        attributes: [
            'brand',
            [Sequelize.fn('COUNT', Sequelize.col('brand')), 'count']
        ],
        where: { type: 'Содержание и уход', petTypeId: 2 },
        group: ['brand']
    });
    res.json(result);
});

router.get("/cat/soderzhanie-i-ukhod/domiki-i-lezhaki", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Содержание и уход', petTypeId: 2 },
            include: [
                {
                    model: Beds,
                    where: {
                        id: Sequelize.col('prodId')
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 2,
                    id: query.id,
                },
                include: [
                    {
                        model: Beds,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 2,
                    available: query.available
                },
                include: [
                    {
                        model: Beds,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Содержание и уход', petTypeId: 2 },
                include: [
                    {
                        model: Beds,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/cat/soderzhanie-i-ukhod/domiki-i-lezhaki/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT brand, COUNT(*) as count 
    FROM prods 
    JOIN beds ON prods.id=beds.prodId 
    WHERE petTypeId=2 AND prods.type='Содержание и уход' 
    GROUP BY brand;
    `);
    res.json(result);
});

router.get("/cat/soderzhanie-i-ukhod/igrushki", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Содержание и уход', petTypeId: 2 },
            include: [
                {
                    model: Toys,
                    where: {
                        id: Sequelize.col('prodId')
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 2,
                    id: query.id,
                },
                include: [
                    {
                        model: Toys,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 2,
                    available: query.available
                },
                include: [
                    {
                        model: Toys,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Содержание и уход', petTypeId: 2 },
                include: [
                    {
                        model: Toys,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/cat/soderzhanie-i-ukhod/igrushki/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT brand, COUNT(*) as count 
    FROM prods 
    JOIN toys ON prods.id=toys.prodId 
    WHERE petTypeId=2 AND prods.type='Содержание и уход' 
    GROUP BY brand;
    `);
    res.json(result);
});
router.get("/cat/soderzhanie-i-ukhod/igrushki/types", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select toys.type,count(*) as count from prods 
    JOIN toys ON prods.id=toys.prodId 
    where prods.type='Содержание и уход' and petTypeId=2
    group by toys.type;
    `);
    res.json(result);
});

router.get("/cat/soderzhanie-i-ukhod/posuda-i-miski", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Содержание и уход', petTypeId: 2 },
            include: [
                {
                    model: Bowls,
                    where: {
                        id: Sequelize.col('prodId')
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 2,
                    id: query.id,
                },
                include: [
                    {
                        model: Bowls,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 2,
                    available: query.available
                },
                include: [
                    {
                        model: Bowls,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Содержание и уход', petTypeId: 2 },
                include: [
                    {
                        model: Bowls,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/cat/soderzhanie-i-ukhod/posuda-i-miski/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT brand, COUNT(*) as count 
    FROM prods 
    JOIN bowls ON prods.id=bowls.prodId 
    WHERE petTypeId=2 AND prods.type='Содержание и уход' 
    GROUP BY brand;
    `);
    res.json(result);
});
router.get("/cat/soderzhanie-i-ukhod/posuda/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT petSize, COUNT(*) as count 
    FROM prods 
    JOIN bowls ON prods.id=bowls.prodId 
    WHERE petTypeId=2 AND prods.type='Содержание и уход' 
    GROUP BY petSize;
    `);
    res.json(result);
});

router.get("/cat/soderzhanie-i-ukhod/transportirovka-perenoski", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Содержание и уход', petTypeId: 2 },
            include: [
                {
                    model: Carrying,
                    where: {
                        id: Sequelize.col('prodId')
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 2,
                    id: query.id,
                },
                include: [
                    {
                        model: Carrying,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 2,
                    available: query.available
                },
                include: [
                    {
                        model: Carrying,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Содержание и уход', petTypeId: 2 },
                include: [
                    {
                        model: Carrying,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/cat/soderzhanie-i-ukhod/transportirovka-perenoski/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT brand, COUNT(*) as count 
    FROM prods 
    JOIN Carryings ON prods.id=Carryings.prodId 
    WHERE petTypeId=2 AND prods.type='Содержание и уход' 
    GROUP BY brand;
    `);
    res.json(result);
});
router.get("/cat/soderzhanie-i-ukhod/transportirovka-perenoski/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT petSize, COUNT(*) as count 
    FROM prods 
    JOIN Carryings ON prods.id=Carryings.prodId 
    WHERE petTypeId=2 AND prods.type='Содержание и уход' 
    GROUP BY petSize;
    `);
    res.json(result);
});

//bird

//korm
router.get("/bird/korm", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Корм', petTypeId: 3 },
            include: [
                {
                    model: Feeds,
                    where: { id: Sequelize.col('prodId') }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 3,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 3,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Корм', petTypeId: 3 },
                include: [
                    {
                        model: Feeds,
                        where: { id: Sequelize.col('prodId') }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/bird/korm/brands", async (req, res) => {
    let result = await Prods.findAll({
        attributes: [
            'brand',
            [Sequelize.fn('COUNT', Sequelize.col('brand')), 'count']
        ],
        where: { type: 'Корм', petTypeId: 3 },
        group: ['brand']
    });
    res.json(result);
});
router.get("/bird/korm/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=3 
    group by weight;
    `);
    res.json(result);
});
router.get("/bird/korm/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=3 
    group by petAge;
    `);
    res.json(result);
});
router.get("/bird/korm/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Корм' AND petTypeId=3
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);
    res.json(result);
});

router.get("/bird/korm/dry-korm", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Корм', petTypeId: 3 },
            include: [
                {
                    model: Feeds,
                    where: {
                        id: Sequelize.col('prodId'),
                        type: 'Сухой корм'
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 3,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Сухой корм'
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 3,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Сухой корм'
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Корм', petTypeId: 3 },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Сухой корм'
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/bird/korm/dry-korm/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=3 and feeds.type='Сухой корм'
    group by brand;
    `);
    res.json(result);
});
router.get("/bird/korm/dry-korm/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=3 and feeds.type='Сухой корм' 
    group by weight;
    `);
    res.json(result);
});
router.get("/bird/korm/dry-korm/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=3 and feeds.type='Сухой корм' 
    group by petAge;
    `);
    res.json(result);
});
router.get("/bird/korm/dry-korm/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Корм' AND petTypeId=3 and feeds.type='Сухой корм'
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);
    res.json(result);
});

router.get("/bird/korm/lakomstva-i-vitaminy", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Корм', petTypeId: 3 },
            include: [
                {
                    model: Feeds,
                    where: {
                        id: Sequelize.col('prodId'),
                        type: 'Лакомства и витамины'
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 3,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Лакомства и витамины'
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 3,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Лакомства и витамины'
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Корм', petTypeId: 3 },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Лакомства и витамины'
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/bird/korm/lakomstva-i-vitaminy/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=3 and feeds.type='Лакомства и витамины'
    group by brand;
    `);
    res.json(result);
});
router.get("/bird/korm/lakomstva-i-vitaminy/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=3 and feeds.type='Лакомства и витамины' 
    group by weight;
    `);
    res.json(result);
});
router.get("/bird/korm/lakomstva-i-vitaminy/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=3 and feeds.type='Лакомства и витамины' 
    group by petAge;
    `);
    res.json(result);
});
router.get("/bird/korm/lakomstva-i-vitaminy/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Корм' AND petTypeId=3 and feeds.type='Лакомства и витамины'
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);
    res.json(result);
});

//soderzhanie-i-ukhod=
router.get("/bird/soderzhanie-i-ukhod", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Содержание и уход', petTypeId: 3 },
            include: [
                {
                    model: Accessories,
                    required: false
                },
                {
                    model: Cages,
                    required: false
                },
                {
                    model: Fillers,
                    required: false
                },
                {
                    model: Bowls,
                    required: false
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 3,
                    id: query.id,
                },
                include: [
                    {
                        model: Accessories,
                        required: false
                    },
                    {
                        model: Cages,
                        required: false
                    },
                    {
                        model: Fillers,
                        required: false
                    },
                    {
                        model: Bowls,
                        required: false
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 3,
                    available: query.available
                },
                include: [
                    {
                        model: Accessories,
                        required: false
                    },
                    {
                        model: Cages,
                        required: false
                    },
                    {
                        model: Fillers,
                        required: false
                    },
                    {
                        model: Bowls,
                        required: false
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Содержание и уход', petTypeId: 3 },
                include: [
                    {
                        model: Accessories,
                        required: false
                    },
                    {
                        model: Cages,
                        required: false
                    },
                    {
                        model: Fillers,
                        required: false
                    },
                    {
                        model: Bowls,
                        required: false
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/bird/soderzhanie-i-ukhod/brands", async (req, res) => {
    let result = await Prods.findAll({
        attributes: [
            'brand',
            [Sequelize.fn('COUNT', Sequelize.col('brand')), 'count']
        ],
        where: { type: 'Содержание и уход', petTypeId: 3 },
        group: ['brand']
    });
    res.json(result);
});

router.get("/bird/soderzhanie-i-ukhod/aksessuary", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Содержание и уход', petTypeId: 3 },
            include: [
                {
                    model: Accessories,
                    where: { id: Sequelize.col('prodId') }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 3,
                    id: query.id,
                },
                include: [
                    {
                        model: Accessories,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 3,
                    available: query.available
                },
                include: [
                    {
                        model: Accessories,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Содержание и уход', petTypeId: 3 },
                include: [
                    {
                        model: Accessories,
                        where: { id: Sequelize.col('prodId') }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/bird/soderzhanie-i-ukhod/aksessuary/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods
    JOIN accessories ON prods.id=accessories.prodId 
    where prods.type='Содержание и уход' and petTypeId=3
    group by brand;
    `);
    res.json(result);
});
router.get("/bird/soderzhanie-i-ukhod/aksessuary/types", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select accessories.type,count(*) as count from prods 
    JOIN accessories ON prods.id=accessories.prodId 
    where prods.type='Содержание и уход' and petTypeId=3
    group by accessories.type;
    `);
    res.json(result);
});

router.get("/bird/soderzhanie-i-ukhod/kletki", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Содержание и уход', petTypeId: 3 },
            include: [
                {
                    model: Cages,
                    where: { id: Sequelize.col('prodId') }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 3,
                    id: query.id,
                },
                include: [
                    {
                        model: Cages,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 3,
                    available: query.available
                },
                include: [
                    {
                        model: Cages,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Содержание и уход', petTypeId: 3 },
                include: [
                    {
                        model: Cages,
                        where: { id: Sequelize.col('prodId') }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/bird/soderzhanie-i-ukhod/kletki/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods
    JOIN Cages ON prods.id=Cages.prodId 
    where prods.type='Содержание и уход' and petTypeId=3
    group by brand;
    `);
    res.json(result);
});

router.get("/bird/soderzhanie-i-ukhod/napolniteli", async (req, res) => {
    let listOfProds = await Prods.findAll({
        where: { type: 'Наполнители', petTypeId: 3 },
        include: [
            {
                model: Fillers,
                where: { id: Sequelize.col('prodId') }
            }
        ]
    });
    res.json(listOfProds);
});
router.get("/bird/soderzhanie-i-ukhod/napolniteli/brands", async (req, res) => {
    let result = await Prods.findAll({
        attributes: [
            'brand',
            [Sequelize.fn('COUNT', Sequelize.col('brand')), 'count']
        ],
        where: { type: 'Наполнители', petTypeId: 3 },
        group: ['brand']
    });
    res.json(result);
});
router.get("/bird/soderzhanie-i-ukhod/napolniteli/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join fillers on fillers.prodId=prods.id 
    where prods.type='Наполнители' and petTypeId=3 
    group by weight;
    `);
    res.json(result);
});

router.get("/bird/soderzhanie-i-ukhod/posuda", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Содержание и уход', petTypeId: 3 },
            include: [
                {
                    model: Bowls,
                    where: {
                        id: Sequelize.col('prodId')
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 3,
                    id: query.id,
                },
                include: [
                    {
                        model: Bowls,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 3,
                    available: query.available
                },
                include: [
                    {
                        model: Bowls,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Содержание и уход', petTypeId: 3 },
                include: [
                    {
                        model: Bowls,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/bird/soderzhanie-i-ukhod/posuda/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT brand, COUNT(*) as count 
    FROM prods 
    JOIN bowls ON prods.id=bowls.prodId 
    WHERE petTypeId=3 AND prods.type='Содержание и уход' 
    GROUP BY brand;
    `);
    res.json(result);
});
router.get("/bird/soderzhanie-i-ukhod/posuda/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT petSize, COUNT(*) as count 
    FROM prods 
    JOIN bowls ON prods.id=bowls.prodId 
    WHERE petTypeId=3 AND prods.type='Содержание и уход' 
    GROUP BY petSize;
    `);
    res.json(result);
});

//rodent

//korm
router.get("/rodent/korm", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Корм', petTypeId: 4 },
            include: [
                {
                    model: Feeds,
                    where: { id: Sequelize.col('prodId') }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 4,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 4,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Корм', petTypeId: 4 },
                include: [
                    {
                        model: Feeds,
                        where: { id: Sequelize.col('prodId') }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/rodent/korm/brands", async (req, res) => {
    let result = await Prods.findAll({
        attributes: [
            'brand',
            [Sequelize.fn('COUNT', Sequelize.col('brand')), 'count']
        ],
        where: { type: 'Корм', petTypeId: 4 },
        group: ['brand']
    });
    res.json(result);
});
router.get("/rodent/korm/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=4
    group by weight;
    `);
    res.json(result);
});
router.get("/rodent/korm/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=4
    group by petAge;
    `);
    res.json(result);
});
router.get("/rodent/korm/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Корм' AND petTypeId=4
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);

    res.json(result);
});
router.get("/rodent/korm/dry-korm", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Корм', petTypeId: 4 },
            include: [
                {
                    model: Feeds,
                    where: {
                        id: Sequelize.col('prodId'),
                        type: 'Сухой корм'
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 4,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Сухой корм'
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 4,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Сухой корм'
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Корм', petTypeId: 4 },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Сухой корм'
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/rodent/korm/dry-korm/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=4 and feeds.type='Сухой корм'
    group by brand;
    `);
    res.json(result);
});
router.get("/rodent/korm/dry-korm/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=4 and feeds.type='Сухой корм' 
    group by weight;
    `);
    res.json(result);
});
router.get("/rodent/korm/dry-korm/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=4 and feeds.type='Сухой корм' 
    group by petAge;
    `);
    res.json(result);
});
router.get("/rodent/korm/dry-korm/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Корм' AND petTypeId=4 and feeds.type='Сухой корм'
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);
    res.json(result);
});

router.get("/rodent/korm/lakomstva-i-vitaminy", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Корм', petTypeId: 4 },
            include: [
                {
                    model: Feeds,
                    where: {
                        id: Sequelize.col('prodId'),
                        type: 'Лакомства и витамины'
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 4,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Лакомства и витамины'
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 4,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Лакомства и витамины'
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Корм', petTypeId: 4 },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Лакомства и витамины'
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/rodent/korm/lakomstva-i-vitaminy/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=4 and feeds.type='Лакомства и витамины'
    group by brand;
    `);
    res.json(result);
});
router.get("/rodent/korm/lakomstva-i-vitaminy/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=4 and feeds.type='Лакомства и витамины' 
    group by weight;
    `);
    res.json(result);
});
router.get("/rodent/korm/lakomstva-i-vitaminy/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=4 and feeds.type='Лакомства и витамины' 
    group by petAge;
    `);
    res.json(result);
});
router.get("/rodent/korm/lakomstva-i-vitaminy/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Корм' AND petTypeId=4 and feeds.type='Лакомства и витамины'
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);
    res.json(result);
});

//soderzhanie-i-ukhod=
router.get("/rodent/soderzhanie-i-ukhod", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Содержание и уход', petTypeId: 4 },
            include: [
                {
                    model: Accessories,
                    required: false
                },
                {
                    model: Fillers,
                    required: false
                },
                {
                    model: Cages,
                    required: false
                },
                {
                    model: Bowls,
                    required: false
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 4,
                    id: query.id,
                },
                include: [
                    {
                        model: Accessories,
                        required: false
                    },
                    {
                        model: Fillers,
                        required: false
                    },
                    {
                        model: Cages,
                        required: false
                    },
                    {
                        model: Bowls,
                        required: false
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 4,
                    available: query.available
                },
                include: [
                    {
                        model: Accessories,
                        required: false
                    },
                    {
                        model: Fillers,
                        required: false
                    },
                    {
                        model: Cages,
                        required: false
                    },
                    {
                        model: Bowls,
                        required: false
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Содержание и уход', petTypeId: 4 },
                include: [
                    {
                        model: Accessories,
                        required: false
                    },
                    {
                        model: Fillers,
                        required: false
                    },
                    {
                        model: Cages,
                        required: false
                    },
                    {
                        model: Bowls,
                        required: false
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/rodent/soderzhanie-i-ukhod/brands", async (req, res) => {
    let result = await Prods.findAll({
        attributes: [
            'brand',
            [Sequelize.fn('COUNT', Sequelize.col('brand')), 'count']
        ],
        where: { type: 'Содержание и уход', petTypeId: 4 },
        group: ['brand']
    });
    res.json(result);
});


router.get("/rodent/soderzhanie-i-ukhod/aksessuary", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Содержание и уход', petTypeId: 4 },
            include: [
                {
                    model: Accessories,
                    where: { id: Sequelize.col('prodId') }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 4,
                    id: query.id,
                },
                include: [
                    {
                        model: Accessories,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 4,
                    available: query.available
                },
                include: [
                    {
                        model: Accessories,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Содержание и уход', petTypeId: 4 },
                include: [
                    {
                        model: Accessories,
                        where: { id: Sequelize.col('prodId') }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/rodent/soderzhanie-i-ukhod/aksessuary/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods
    JOIN accessories ON prods.id=accessories.prodId 
    where prods.type='Содержание и уход' and petTypeId=4
    group by brand;
    `);
    res.json(result);
});
router.get("/rodent/soderzhanie-i-ukhod/aksessuary/types", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select accessories.type,count(*) as count from prods 
    JOIN accessories ON prods.id=accessories.prodId 
    where prods.type='Содержание и уход' and petTypeId=4
    group by accessories.type;
    `);
    res.json(result);
});

router.get("/rodent/soderzhanie-i-ukhod/kletki", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Содержание и уход', petTypeId: 4 },
            include: [
                {
                    model: Cages,
                    where: { id: Sequelize.col('prodId') }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 4,
                    id: query.id,
                },
                include: [
                    {
                        model: Cages,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 4,
                    available: query.available
                },
                include: [
                    {
                        model: Cages,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Содержание и уход', petTypeId: 4 },
                include: [
                    {
                        model: Cages,
                        where: { id: Sequelize.col('prodId') }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/rodent/soderzhanie-i-ukhod/kletki/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods
    JOIN Cages ON prods.id=Cages.prodId 
    where prods.type='Содержание и уход' and petTypeId=4
    group by brand;
    `);
    res.json(result);
});

router.get("/rodent/soderzhanie-i-ukhod/napolniteli", async (req, res) => {
    let listOfProds = await Prods.findAll({
        where: { type: 'Наполнители', petTypeId: 4 },
        include: [
            {
                model: Fillers,
                where: { id: Sequelize.col('prodId') }
            }
        ]
    });
    res.json(listOfProds);
});
router.get("/rodent/soderzhanie-i-ukhod/napolniteli/brands", async (req, res) => {
    let result = await Prods.findAll({
        attributes: [
            'brand',
            [Sequelize.fn('COUNT', Sequelize.col('brand')), 'count']
        ],
        where: { type: 'Наполнители', petTypeId: 4 },
        group: ['brand']
    });
    res.json(result);
});
router.get("/rodent/soderzhanie-i-ukhod/napolniteli/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join fillers on fillers.prodId=prods.id 
    where prods.type='Наполнители' and petTypeId=4 
    group by weight;
    `);
    res.json(result);
});

router.get("/rodent/soderzhanie-i-ukhod/posuda", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Содержание и уход', petTypeId: 4 },
            include: [
                {
                    model: Bowls,
                    where: {
                        id: Sequelize.col('prodId')
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 4,
                    id: query.id,
                },
                include: [
                    {
                        model: Bowls,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 4,
                    available: query.available
                },
                include: [
                    {
                        model: Bowls,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Содержание и уход', petTypeId: 4 },
                include: [
                    {
                        model: Bowls,
                        where: {
                            id: Sequelize.col('prodId')
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/rodent/soderzhanie-i-ukhod/posuda/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT brand, COUNT(*) as count 
    FROM prods 
    JOIN bowls ON prods.id=bowls.prodId 
    WHERE petTypeId=4 AND prods.type='Содержание и уход' 
    GROUP BY brand;
    `);
    res.json(result);
});
router.get("/rodent/soderzhanie-i-ukhod/posuda/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT petSize, COUNT(*) as count 
    FROM prods 
    JOIN bowls ON prods.id=bowls.prodId 
    WHERE petTypeId=4 AND prods.type='Содержание и уход' 
    GROUP BY petSize;
    `);
    res.json(result);
});
//fish

//aquariums
router.get("/fish/aquariums", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Аквариумы', petTypeId: 5 },
            include: [
                {
                    model: Aquariums,
                    where: { id: Sequelize.col('prodId') }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Аквариумы',
                    petTypeId: 5,
                    id: query.id,
                },
                include: [
                    {
                        model: Aquariums,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Аквариумы',
                    petTypeId: 5,
                    available: query.available
                },
                include: [
                    {
                        model: Aquariums,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Аквариумы', petTypeId: 5 },
                include: [
                    {
                        model: Aquariums,
                        where: { id: Sequelize.col('prodId') }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/fish/aquariums/brands", async (req, res) => {
    let result = await Prods.findAll({
        attributes: [
            'brand',
            [Sequelize.fn('COUNT', Sequelize.col('brand')), 'count']
        ],
        where: { type: 'Аквариумы', petTypeId: 5 },
        group: ['brand']
    });
    res.json(result);
});
router.get("/fish/aquariums/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select volume,count(*) as count from prods 
    join aquariums on aquariums.prodId=prods.id 
    where prods.type='Аквариумы' and petTypeId=5
    group by volume;
    `);
    res.json(result);
});

//korm
router.get("/fish/korm", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Корм', petTypeId: 5 },
            include: [
                {
                    model: Feeds,
                    where: { id: Sequelize.col('prodId') }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 5,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 5,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Корм', petTypeId: 5 },
                include: [
                    {
                        model: Feeds,
                        where: { id: Sequelize.col('prodId') }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/fish/korm/brands", async (req, res) => {
    let result = await Prods.findAll({
        attributes: [
            'brand',
            [Sequelize.fn('COUNT', Sequelize.col('brand')), 'count']
        ],
        where: { type: 'Корм', petTypeId: 5 },
        group: ['brand']
    });
    res.json(result);
});
router.get("/fish/korm/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=5
    group by weight;
    `);
    res.json(result);
});
router.get("/fish/korm/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    where prods.type='Корм' and petTypeId=5
    group by petAge;
    `);
    res.json(result);
});
router.get("/fish/korm/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Корм' AND petTypeId=5
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);

    res.json(result);
});

router.get("/fish/korm/korm-dlya-ryb", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Корм', petTypeId: 5 },
            include: [
                {
                    model: Feeds,
                    where: {
                        id: Sequelize.col('prodId'),
                        type: 'Корм для рыб'
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 5,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Корм для рыб'
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 5,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Корм для рыб'
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Корм', petTypeId: 5 },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Корм для рыб'
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/fish/korm/korm-dlya-ryb/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    WHERE prods.type='Корм' AND petTypeId=5 and feeds.type='Корм для рыб'
    group by brand;
    `);
    res.json(result);
});
router.get("/fish/korm/korm-dlya-ryb/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    WHERE prods.type='Корм' AND petTypeId=5 and feeds.type='Корм для рыб'
    group by weight;
    `);
    res.json(result);
});
router.get("/fish/korm/korm-dlya-ryb/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    WHERE prods.type='Корм' AND petTypeId=5 and feeds.type='Корм для рыб'
    group by petAge;
    `);
    res.json(result);
});
router.get("/fish/korm/korm-dlya-ryb/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Корм' AND petTypeId=5 and feeds.type='Корм для рыб'
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);

    res.json(result);
});

router.get("/fish/korm/korm-dlya-cherepakh", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Корм', petTypeId: 5 },
            include: [
                {
                    model: Feeds,
                    where: {
                        id: Sequelize.col('prodId'),
                        type: 'Корм для черепах'
                    }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 5,
                    id: query.id,
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Корм для черепах'
                        }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Корм',
                    petTypeId: 5,
                    available: query.available
                },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Корм для черепах'
                        }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Корм', petTypeId: 5 },
                include: [
                    {
                        model: Feeds,
                        where: {
                            id: Sequelize.col('prodId'),
                            type: 'Корм для черепах'
                        }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/fish/korm/korm-dlya-cherepakh/brands", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select brand,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    WHERE prods.type='Корм' AND petTypeId=5 and feeds.type='Корм для черепах'
    group by brand;
    `);
    res.json(result);
});
router.get("/fish/korm/korm-dlya-cherepakh/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    WHERE prods.type='Корм' AND petTypeId=5 and feeds.type='Корм для черепах'
    group by weight;
    `);
    res.json(result);
});
router.get("/fish/korm/korm-dlya-cherepakh/ages", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select petAge,count(*) as count from prods 
    join feeds on feeds.prodId=prods.id 
    WHERE prods.type='Корм' AND petTypeId=5 and feeds.type='Корм для черепах'
    group by petAge;
    `);
    res.json(result);
});
router.get("/fish/korm/korm-dlya-cherepakh/flavours", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    SELECT flavour, COUNT(*) as count
    FROM (
        SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(t.flavour, ',', n.n), ',', -1) flavour
        FROM (
            SELECT flavour FROM prods 
            JOIN feeds ON feeds.prodId=prods.id 
            WHERE prods.type='Корм' AND petTypeId=5 and feeds.type='Корм для черепах'
        ) t CROSS JOIN (
            SELECT a.N + b.N * 10 + 1 n
            FROM (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) a,
            (
                SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
            ) b
            ORDER BY n
        ) n
        WHERE n.n <= 1 + (LENGTH(t.flavour) - LENGTH(REPLACE(t.flavour, ',', '')))
    ) s
    GROUP BY flavour;
`);

    res.json(result);
});

//soderzhanie-i-ukhod=
router.get("/fish/soderzhanie-i-ukhod", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Содержание и уход', petTypeId: 5 },
            include: [
                {
                    model: Drugs,
                    where: { id: Sequelize.col('prodId') }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 5,
                    id: query.id,
                },
                include: [
                    {
                        model: Drugs,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 5,
                    available: query.available
                },
                include: [
                    {
                        model: Drugs,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Содержание и уход', petTypeId: 5 },
                include: [
                    {
                        model: Drugs,
                        where: { id: Sequelize.col('prodId') }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/fish/soderzhanie-i-ukhod/brands", async (req, res) => {
    let result = await Prods.findAll({
        attributes: [
            'brand',
            [Sequelize.fn('COUNT', Sequelize.col('brand')), 'count']
        ],
        where: { type: 'Содержание и уход', petTypeId: 5 },
        group: ['brand']
    });
    res.json(result);
});

router.get("/fish/soderzhanie-i-ukhod/khimiya-i-lekarstva", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Содержание и уход', petTypeId: 5 },
            include: [
                {
                    model: Drugs,
                    where: { id: Sequelize.col('prodId') }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 5,
                    id: query.id,
                },
                include: [
                    {
                        model: Drugs,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 5,
                    available: query.available
                },
                include: [
                    {
                        model: Drugs,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Содержание и уход', petTypeId: 5 },
                include: [
                    {
                        model: Drugs,
                        where: { id: Sequelize.col('prodId') }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/fish/soderzhanie-i-ukhod/khimiya-i-lekarstva/brands", async (req, res) => {
    let result = await Prods.findAll({
        attributes: [
            'brand',
            [Sequelize.fn('COUNT', Sequelize.col('brand')), 'count']
        ],
        where: { type: 'Содержание и уход', petTypeId: 5 },
        group: ['brand']
    });
    res.json(result);
});

router.get("/fish/soderzhanie-i-ukhod/dekoratsii", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Содержание и уход', petTypeId: 5 },
            include: [
                {
                    model: Accessories,
                    where: { id: Sequelize.col('prodId') }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 5,
                    id: query.id,
                },
                include: [
                    {
                        model: Accessories,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Содержание и уход',
                    petTypeId: 5,
                    available: query.available
                },
                include: [
                    {
                        model: Accessories,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Содержание и уход', petTypeId: 5 },
                include: [
                    {
                        model: Accessories,
                        where: { id: Sequelize.col('prodId') }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/fish/soderzhanie-i-ukhod/dekoratsii/brands", async (req, res) => {
    let result = await Prods.findAll({
        attributes: [
            'brand',
            [Sequelize.fn('COUNT', Sequelize.col('brand')), 'count']
        ],
        where: { type: 'Содержание и уход', petTypeId: 5 },
        group: ['brand']
    });
    res.json(result);
});

//veterinary

router.get("/veterinary/veterinary", async (req, res) => {
    let query = req.query;
    let listOfProds;
    if (Object.keys(query).length === 0)
        listOfProds = await Prods.findAll({
            where: { type: 'Ветпрепараты', petTypeId: 6 },
            include: [
                {
                    model: Veterinary,
                    where: { id: Sequelize.col('prodId') }
                }
            ]
        });
    else {
        if (query.id)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Ветпрепараты',
                    petTypeId: 6,
                    id: query.id,
                },
                include: [
                    {
                        model: Veterinary,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else if (query.available)
            listOfProds = await Prods.findAll({
                where: {
                    type: 'Ветпрепараты',
                    petTypeId: 6,
                    available: query.available
                },
                include: [
                    {
                        model: Veterinary,
                        where: { id: Sequelize.col('prodId') }
                    }
                ]
            });
        else {
            let sortField = query.sortField;
            let sortOrder = query.sortOrder;

            let sortOptions = {};
            if (sortField && sortOrder) {
                sortOptions.order = [[sortField, sortOrder]];
            }

            listOfProds = await Prods.findAll({
                where: { type: 'Ветпрепараты', petTypeId: 6 },
                include: [
                    {
                        model: Veterinary,
                        where: { id: Sequelize.col('prodId') }
                    }
                ],
                ...sortOptions
            });
        }
    }
    res.json(listOfProds);
});
router.get("/veterinary/veterinary/brands", async (req, res) => {
    let result = await Prods.findAll({
        attributes: [
            'brand',
            [Sequelize.fn('COUNT', Sequelize.col('brand')), 'count']
        ],
        where: { type: 'Ветпрепараты', petTypeId: 6 },
        group: ['brand']
    });
    res.json(result);
});
router.get("/veterinary/veterinary/weights", async (req, res) => {
    const [result, metadata] = await Prods.sequelize.query(`
    select weight,count(*) as count from prods 
    join veterinaries on veterinaries.prodId=prods.id 
    where prods.type='Ветпрепараты' and petTypeId=6
    group by weight;
    `);
    res.json(result);
});


router.post("/", async (req, res) => {
    const prod = req.body;
    await Prods.create(prod);
    res.json(prod);
});

module.exports = router;