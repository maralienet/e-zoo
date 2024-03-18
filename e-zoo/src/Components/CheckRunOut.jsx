import React, { useState, useEffect } from "react";
import axios from 'axios';

function CheckRunOut({ close }) {
    const [prods, setProdsList] = useState([]);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/prods`).then((res) => {
            let a = res.data;
            a = a.filter(item => item.available === false);
            setProdsList(a);
        });

        axios.get(`http://localhost:3001/orders/runout/dates`).then((res) => {
            let a = res.data;
            a = a.map((item) => {
                item.data = new Date(item.data).toISOString().split('T')[0];
                item.data = formatDate(new Date(item.data));
                return item;
            });
            setDates(a);
        });

    }, []);
    function formatDate(date) {
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yy = date.getFullYear();

        return dd + '.' + mm + '.' + yy;
    }

    return (
        <div className="overflowWin checkRunOut">
            <div className="inside">
                <div class="close" onClick={close}>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 16" stroke="#9E9E9E" stroke-width="2"></path>
                        <path d="M1 16L16 1" stroke="#9E9E9E" stroke-width="2"></path>
                    </svg>
                </div>
                <b>Закончившиеся товары</b>
                <div>
                    <ul>
                        {prods.map((prod, index) => (
                            <li className="sold">
                                <img src={require(`../pics/prods/${prod.image}`)} />
                                <span>{prod.brand} {prod.name}</span>
                                <div>
                                    Последний продан: <span>{dates[index].data}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CheckRunOut;