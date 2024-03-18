import React, { useState, useEffect } from "react";
import axios from 'axios';
import useCookie from '../Components/useCookie'
import { useParams } from 'react-router-dom';
import OrderProdsCard from "../Components/OrderProdsCard";

import MenuNav from "../Components/MenuNav";

import userpic from '../pics/user.svg';
import date from '../pics/date.svg';

function Order() {
    const id = useCookie('userid');
    let { code } = useParams();
    const [user, setUser] = useState();
    const [prodList, setProd] = useState([]);
    const [total, setTotal] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3001/orders/cheque/${code}`).then((res) => {
            let array = res.data;
            let list = array.map(obj => {
                let date = new Date(obj.createdAt);
                obj.createdAt = formatDate(date);
                return obj;
            });
            setProd(list);

            let t = array.reduce((sum, current) => {
                return sum + current.total;
            }, 0)
            setTotal(t.toFixed(2));
        });

        axios.get(`http://localhost:3001/users?id=${id}`).then((res) => {
            setUser(res.data[0])
        });
    }, []);

    function formatDate(date) {

        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
    }


    return (
        <div className="order">
            <MenuNav />
            <div className="top">
                <div>
                    <a className="back" href={`/me/${id}`}>
                        Назад
                    </a>
                </div>
                <div>
                    <div className="header">
                        <h4>Заказ №{code}</h4>
                    </div>
                </div>
            </div>
            <div className="body">
                <aside>
                    <ul className="asideFilter">
                        <li>
                            <img src={userpic} />
                            <div>
                                <b>Получатель</b>
                                <span>{user && user.email}</span>
                            </div>
                        </li>
                        <li>
                            <img src={date} />
                            <div>
                                <b>Дата заказа</b>
                                <span>{prodList[0] && prodList[0].createdAt}</span>
                            </div>
                        </li>
                        <li className="total">
                            <span>Сумма заказа</span>
                            <b>{total} BYN</b>
                        </li>
                    </ul>
                </aside>
                <div className="prodList">
                    {
                        prodList.map((prod) => (
                            <OrderProdsCard
                                key={prod.id}
                                img={require(`../pics/prods/${prod.Prod.image}`)}
                                name={`${prod.Prod.brand} ${prod.Prod.name}`}
                                number={prod.number}
                                price={prod.Prod.price}
                                isAvail={prod.Prod.available}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Order;