const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const { Orders, Users, Prods } = require('../models');

router.get("/", async (req, res) => {
    let query = req.query;
    let list;

    if (Object.keys(query).length === 0)
        list = await Orders.findAll({
            include: [
                {
                    model: Users,
                    where: { userId: Sequelize.col('user.id') }
                },
                {
                    model: Prods,
                    where: { prodId: Sequelize.col('prod.id') }
                }
            ],
        });
    else
        list = await Orders.findAll({
            where: query,
            include: [
                {
                    model: Users,
                    required: false
                },
                {
                    model: Prods,
                    required: false
                }
            ],
        });
    res.json(list);
});

router.get("/cheque/:code", async (req, res) => {
    const { code } = req.params;
    let list;

    list = await Orders.findAll({
        where: { orderCode: code },
        include: [
            {
                model: Users,
                where: { userId: Sequelize.col('user.id') }
            },
            {
                model: Prods,
                where: { prodId: Sequelize.col('prod.id') }
            }
        ],
    });

    res.json(list);
});

router.get("/codes", async (req, res) => {
    let list;
    list = await Orders.findAll({
        attributes: ['orderCode'],
        group: 'orderCode',
    });
    res.json(list);
});

router.get("/orderGroup/:id", async (req, res) => {
    const { id } = req.params;
    let list;
    list = await Orders.findAll({
        where: { userId: id },
        attributes: [
            'orderCode', 
            [Sequelize.literal('round(sum(total*number),2)'), 'total'], 
            'createdAt'
        ],
        group: ['orderCode', 'createdAt'],
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});


router.get("/count", async (req, res) => {
    let query = req.query;
    let list;

    if (Object.keys(query).length === 0)
        list = await Orders.findAll({
            attributes: [
                'Orders.userId',
                [Sequelize.fn('COUNT', Sequelize.col('Orders.userId')), 'count']
            ],
            group: ['Orders.userId']
        });
    else
        list = await Orders.findAll({
            where: query,
            attributes: [
                'Orders.userId',
                [Sequelize.fn('COUNT', Sequelize.col('Orders.userId')), 'count']
            ],
            group: ['Orders.userId']
        });
    res.json(list);
});

router.get("/runout/dates", async (req, res) => {
    const [result, metadata] = await Orders.sequelize.query(`
    select prodId,max(createdAt) as data from orders 
    where prodId in (select id from prods where available=0) 
    group by prodId;
    `);
    res.json(result);
});

router.post("/", async (req, res) => {
    const orderItem = req.body;
    const createdItem = await Orders.create(orderItem);
    res.json(createdItem);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const orderItem = await Orders.findByPk(id);

    await orderItem.destroy();
    return res.json({ message: 'Item was deleted' });
});



module.exports = router;