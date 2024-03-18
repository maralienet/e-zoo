import React, { useState, useEffect } from "react";
import axios from "axios";
import useCookie from '../Components/useCookie'
import MenuNav from "../Components/MenuNav";
import CartProdCard from "../Components/CartProdCard";
import emptyCart from '../pics/emptyCart.png';

function Cart() {
    const uidCookie = useCookie('userid');
    const [prodList, setProdList] = useState([]);
    const [prodListAvail, setProdListAvail] = useState([]);
    const [codes, setCodes] = useState([]);
    const [sum, setSum] = useState(0);
    const [total, setTotal] = useState(0);
    const [sale, setSale] = useState(0);
    const [confirmed, setConfirmed] = useState(false);
    useEffect(() => {
        axios.get(`http://localhost:3001/cart?userid=${uidCookie}`).then((res) => {
            let prl = res.data;
            let prlA = prl.filter(item => item.Prod.available === true);

            setProdList(prl);
            setProdListAvail(prlA);
            updateTotal();
        });
        axios.get(`http://localhost:3001/orders/codes`).then((res) => {
            setCodes(res.data)
        });
    }, []);

    useEffect(() => {
        let newSale = 0;
        if (sum > 200)
            newSale = 10;
        else if (sum > 150)
            newSale = 7;
        else if (sum > 100)
            newSale = 5;
        setSale(newSale);
        setTotal((sum - (sum * newSale * 0.01)).toFixed(2));
        axios.get(`http://localhost:3001/cart?userid=${uidCookie}`).then((res) => {
            setProdList(res.data);
        });
    }, [sum]);

    const updateTotal = () => {
        axios.get(`http://localhost:3001/cart/sum/${uidCookie}`).then((res) => {
            setSum(res.data.total);
        });
    }

    const generateCode = () => {
        let code = '';
        for (let i = 0; i < 6; i++)
            code += Math.floor(Math.random() * 10);

        if (codes.includes(code)) {
            while (codes.includes(code))
                for (let i = 0; i < 6; i++)
                    code += Math.floor(Math.random() * 10);
        }

        return code;
    }

    const makeOrder = async () => {
        let code = await generateCode();

        let postPromises = prodListAvail.map(item => {
            return axios.post(`http://localhost:3001/orders`, {
                orderCode: code,
                total: item.Prod.price,
                prodId: item.Prod.id,
                number: item.number,
                userId: uidCookie
            });
        });

        await Promise.all(postPromises);

        let orderItems = [];
        let res = await axios.get(`http://localhost:3001/orders/cheque/${code}`);
        let items = res.data;
        items.forEach((item) => {
            orderItems.push({
                name: `${item.Prod.brand} ${item.Prod.name}`,
                price: item.Prod.price,
                number: item.number
            });
        });

        res = await axios.get(`http://localhost:3001/users?id=${uidCookie}`);
        let email = res.data[0].email;

        axios.get("http://localhost:4000/cheque", {
            params: {
                email: email,
                code: code,
                prods: JSON.stringify(orderItems),
                total: total,
                sale: sale,
                sum: sum
            },
        })
            .then(() => {
                console.log("success");
                setConfirmed(true);
            })
            .catch(() => {
                console.log("failure");
            });
    }

    const clearCart = () => {
        axios.delete(`http://localhost:3001/cart/all/${uidCookie}`)
            .then((res) => {
                document.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });

    }


    return (
        <div className="cart">
            <MenuNav />
            <div className="head">
                <h4>Корзина</h4>
                <div className="count">{prodList.length}</div>
            </div>
            {
                prodList.length === 0 || !uidCookie ?
                    <div className="emptyCart">
                        <img src={emptyCart} />
                        <p>Нет товаров</p>
                        <a href='/'>Перейти в каталог</a>
                    </div>
                    :
                    <div className="body">
                        {
                            confirmed &&
                            <div className="confirmation">
                                <h4>Заказ оформлен!</h4>
                                <button onClick={() => { setConfirmed(false); clearCart() }}>Ок</button>
                            </div>
                        }
                        <div className="prods">
                            <div className="prodList">
                                {prodList.map((prod) => (
                                    <CartProdCard
                                        key={prod.id}
                                        id={prod.id}
                                        img={require(`../pics/prods/${prod.Prod.image}`)}
                                        name={`${prod.Prod.brand} ${prod.Prod.name}`}
                                        number={prod.number}
                                        price={prod.Prod.price}
                                        isAvail={prod.Prod.available}
                                        onUpdate={updateTotal}
                                        storeNumber={prod.Prod.Store.number}
                                    />
                                ))}
                            </div>
                        </div>
                        <aside>
                            <div className="cheque">
                                <h4>Итого:</h4>
                                <div className="priceCount">
                                    <p>Товары (<span className="prodsCount">{prodListAvail.length}</span>)</p>
                                    <p className="price">{sum} BYN</p>
                                </div>
                                <div className="deliveryPrice">
                                    <p>Скидка</p>
                                    <p>{sale}%</p>
                                </div>
                                <div className="sum">
                                    <p>К оплате</p>
                                    <h4>{total} BYN</h4>
                                </div>
                                <div>
                                    <button disabled={parseFloat(total) === 0.00} type="button" onClick={makeOrder}>Оформить заказ</button>
                                </div>
                            </div>
                        </aside>
                    </div>
            }
        </div>
    );
}

export default Cart;