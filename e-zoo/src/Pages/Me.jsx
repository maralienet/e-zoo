import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MenuNav from "../Components/MenuNav";

import exit from '../pics/exit.svg';
import add from '../pics/add.svg';
import OrderItem from "../Components/OrderItem";
import AddSupply from "../Components/AddSupply";
import ReportDelivery from "../Components/ReportDelivery";
import ReportSellings from "../Components/ReportSellings";
import ReportCheque from "../Components/ReportCheque";
import ChangePersInfo from "../Components/ChangePersInfo";
import AddDeliveryAddress from "../Components/AddDeliveryAddress";
import ChangeCity from "../Components/ChangeCity";
import CheckRunOut from "../Components/CheckRunOut";
import ReportRemains from "../Components/ReportRemains";

function Me() {
    let { id } = useParams();
    const [user, setUser] = useState();
    const [access, setAccess] = useState();
    const [page, setPage] = useState('');
    const [orders, setOrdersList] = useState([]);
    const [isAddSupplyShown, showAddSupply] = useState(false);
    const [isCheckRunOutShown, showCheckRunOut] = useState(false);
    const [isChangePersInfoShown, showChangePersInfo] = useState(false);
    const [isChangeAddressShown, showChangeAddress] = useState(false);
    const [isChangeCityShown, showChangeCity] = useState(false);
    useEffect(() => {
        axios.get(`http://localhost:3001/orders/orderGroup/${id}`).then((res) => {
            let array = res.data;
            let list = array.map(obj => {
                let date = new Date(obj.createdAt);
                obj.createdAt = formatDate(date);
                return obj;
            });
            setOrdersList(list);
        });

        axios.get(`http://localhost:3001/users?id=${id}`).then((res) => {
            setUser(res.data[0])
            setAccess(res.data[0].Admins[0].accessLvl)
        });
    }, []);
    function deleteAllCookies() {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            document.location = ('/');
        }
    }
    function formatDate(date) {

        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yy = date.getFullYear();

        return dd + '.' + mm + '.' + yy;
    }

    return (
        <div className="me">
            <MenuNav />
            <div className="body">
                <aside>
                    <ul className="asideFilter">
                        <li onClick={() => setPage('')}>Профиль</li>
                        <li onClick={() => setPage('orders')}>Заказы</li>
                        {access !== 3 &&
                            <li onClick={() => setPage('manage')}>Управление</li>
                        }
                    </ul>
                    <div className="exit">
                        <button onClick={() => deleteAllCookies()}>
                            <img src={exit} />
                            Выйти
                        </button>
                    </div>
                </aside>
                <div className="mainMe">
                    {page === '' &&
                        <div>
                            <h4>Профиль</h4>
                            <div className="inf">
                                <div className="general">
                                    <h5>Общая информация
                                        <span className="edit" onClick={() => showChangePersInfo(true)}>
                                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.069 15.8408L16.0545 8.93759C16.3307 8.4593 16.1668 7.84771 15.6885 7.57156L13.2371 6.15625C12.7588 5.88011 12.1472 6.04398 11.8711 6.52228L7.88551 13.4255" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round"></path>
                                                <path d="M7.88938 13.4212L7.90151 16.5027C7.90453 17.269 8.73295 17.7473 9.39809 17.3668L12.0728 15.8365" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round"></path>
                                                <path d="M7.88672 20.3438L18.0452 20.3438" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round"></path>
                                            </svg>
                                        </span>
                                    </h5>
                                    <div className="genItem">
                                        <span className="title">Имя</span>
                                        <span className="value">{user ? user.name : ''}</span>
                                    </div>
                                    <div className="genItem">
                                        <span className="title">Фамилия</span>
                                        <span className="value">{user ? user.surname : ''}</span>
                                    </div>
                                    <div className="genItem">
                                        <span className="title">E-mail</span>
                                        <span className="value">{user ? user.email : ''}</span>
                                    </div>
                                </div>
                                <div className="additional">
                                    <h5>Ваш город</h5>
                                    <div className="city">
                                        {user && user.city}
                                        <span className="edit" onClick={() => showChangeCity(true)}>
                                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.069 15.8408L16.0545 8.93759C16.3307 8.4593 16.1668 7.84771 15.6885 7.57156L13.2371 6.15625C12.7588 5.88011 12.1472 6.04398 11.8711 6.52228L7.88551 13.4255" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round"></path>
                                                <path d="M7.88938 13.4212L7.90151 16.5027C7.90453 17.269 8.73295 17.7473 9.39809 17.3668L12.0728 15.8365" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round"></path>
                                                <path d="M7.88672 20.3438L18.0452 20.3438" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round"></path>
                                            </svg>
                                        </span>
                                    </div>
                                    <h5>Адрес доставки</h5>
                                    {user ? user.street &&
                                        <>
                                            {user.street},
                                            д. {user.house},
                                            {user.corps && ` корп. ${user.corps},`}
                                            {user.floor && ` эт. ${user.floor},`}
                                            {user.flat && ` кв. ${user.flat}`}
                                            <span className="edit" onClick={() => showChangeAddress(true)}>
                                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.069 15.8408L16.0545 8.93759C16.3307 8.4593 16.1668 7.84771 15.6885 7.57156L13.2371 6.15625C12.7588 5.88011 12.1472 6.04398 11.8711 6.52228L7.88551 13.4255" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round"></path>
                                                    <path d="M7.88938 13.4212L7.90151 16.5027C7.90453 17.269 8.73295 17.7473 9.39809 17.3668L12.0728 15.8365" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round"></path>
                                                    <path d="M7.88672 20.3438L18.0452 20.3438" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round"></path>
                                                </svg>
                                            </span>
                                        </>
                                        :
                                        <div className="addAddress" onClick={() => showChangeAddress(true)}>
                                            <img src={add} />Добавить адрес
                                        </div>
                                    }
                                </div>
                            </div>
                            {isChangePersInfoShown && <ChangePersInfo close={() => showChangePersInfo(false)} user={user} />}
                            {isChangeAddressShown && <AddDeliveryAddress close={() => showChangeAddress(false)} user={user} />}
                            {isChangeCityShown && <ChangeCity close={() => showChangeCity(false)} user={user} />}
                        </div>
                    }
                    {page === 'orders' &&
                        <div className="orders">
                            <h4>Заказы</h4>
                            <div>
                                {orders.map((prod) => (
                                    <OrderItem date={prod.createdAt} code={prod.orderCode} price={prod.total} />
                                ))}
                            </div>
                        </div>
                    }
                    {page === 'manage' &&
                        <div>
                            <h4>Управление</h4>
                            <div className="inf managing">
                                {access === 1 &&
                                    <div className="report">
                                        <ReportCheque />
                                        <br />
                                        <ReportSellings />
                                        <br />
                                        <ReportDelivery />
                                        <br />
                                        <ReportRemains />
                                    </div>}
                                <div className="shopManaging">
                                    <div>
                                        <h5>Отметить поставку товара</h5>
                                        <button className="mainbtn" onClick={() => showAddSupply(!isAddSupplyShown)}>Отметить</button>
                                        {isAddSupplyShown && <AddSupply close={() => showAddSupply(false)} />}
                                    </div>
                                    <div>
                                        <h5>Просмотреть закончившиеся товары</h5>
                                        <button className="mainbtn" onClick={() => showCheckRunOut(!isCheckRunOutShown)}>Просмотреть</button>
                                        {isCheckRunOutShown && <CheckRunOut close={() => showCheckRunOut(false)} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Me;