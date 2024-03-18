const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const { Cart, Users, Prods, Store } = require('../models');

router.get("/", async (req, res) => {
    let query = req.query;
    let list;

    if (Object.keys(query).length === 0)
        list = await Cart.findAll({
            include: [
                {
                    model: Users,
                    where: { userId: Sequelize.col('user.id') }
                },
                {
                    model: Prods,
                    where: { prodId: Sequelize.col('prod.id') },
                    include: [
                        {
                            model: Store,
                            required: true
                        }
                    ]
                }
            ],
        });
    else
        list = await Cart.findAll({
            where: query,
            include: [
                {
                    model: Users,
                    required: false
                },
                {
                    model: Prods,
                    required: false,
                    include: [
                        {
                            model: Store,
                            required: true
                        }
                    ]
                }
            ],
        });
    res.json(list);
});

router.get("/count", async (req, res) => {
    let query = req.query;
    let list;

    if (Object.keys(query).length === 0)
        list = await Cart.findAll({
            attributes: [
                'cart.userId',
                [Sequelize.fn('COUNT', Sequelize.col('cart.userId')), 'count']
            ],
            group: ['cart.userId']
        });
    else
        list = await Cart.findAll({
            where: query,
            attributes: [
                'cart.userId',
                [Sequelize.fn('COUNT', Sequelize.col('cart.userId')), 'count']
            ],
            group: ['cart.userId']
        });
    res.json(list);
});

router.get("/sum/:id", async (req, res) => {
    const { id } = req.params;

    const cartItems = await Cart.findAll({
        where: { userId: id },
        include: [
            {
                model: Prods,
                required: true,
                where: { available: 1 }
            }
        ]
    });

    const total = cartItems.reduce((sum, item) => sum + item.Prod.price * item.number, 0).toFixed(2);

    res.json({ total });
});


router.post("/", async (req, res) => {
    const cartItem = req.body;
    const createdCartItem = await Cart.create(cartItem);
    res.json(createdCartItem);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { number } = req.body;
    const cartItem = await Cart.findByPk(id);

    const updatedCartItem = await cartItem.update({ number });
    return res.json(updatedCartItem);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const cartItem = await Cart.findByPk(id);

    await cartItem.destroy();
    return res.json({ message: 'Item were deleted' });
});
router.delete('/all/:userId', async (req, res) => {
    const { userId } = req.params;
    const cartItems = await Cart.findAll({
        where: { userId: userId },
        include: [
            {
                model: Prods,
                where: { available: 1 }
            }
        ]
    });

    for (let item of cartItems) {
        await item.destroy();
    }

    return res.json({ message: 'Items were deleted' });
});




module.exports = router;