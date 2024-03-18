import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useCookie from '../Components/useCookie'
import MenuNav from "../Components/MenuNav";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import ProductMoreInfo from "../Components/ProductMoreInfo";

function Product() {
    let { animal, type, id } = useParams();
    const [prod, setProd] = useState();
    const [inCart, setInCart] = useState(false);
    const [auth, setAuth] = useState(true);
    const uidCookie = useCookie('userid');
    let animalBC;
    switch (animal) {
        case 'dog': animalBC = 'Собаки'; break;
        case 'cat': animalBC = 'Кошки'; break;
        case 'bird': animalBC = 'Птицы'; break;
        case 'rodent': animalBC = 'Грызуны'; break;
        case 'fish': animalBC = 'Рыбки'; break;
        case 'veterinaries': animalBC = 'Ветаптека'; break;
    }
    let typeBC;
    switch (type) {
        case 'diet-korm': typeBC = 'Диетический Корм'; break;
        case 'korm': typeBC = 'Корм'; break;
        case 'soderzhanie-i-ukhod': typeBC = 'Содержание и уход'; break;
        case 'aquariums': typeBC = 'Аквариумы'; break;
        case 'fillers': typeBC = 'Наполнители'; break;
        case 'veterinary': typeBC = 'Ветпрепараты'; break;
    }
    useEffect(() => {
        axios.get(`http://localhost:3001/cart?userid=${uidCookie}&prodid=${id}`).then((res) => {
            setInCart(res.data.length > 0);
        });

        axios.get(`http://localhost:3001/prods/${animal}/${type}?id=${id}`).then((res) => {
            setProd(res.data[0])
            console.log(res.data[0])
        });
    }, []);
    const addToCart = (id, e) => {
        e.stopPropagation();
        if (uidCookie)
            axios.post(`http://localhost:3001/cart`, {
                prodId: id,
                userId: uidCookie
            }).then((res) => {
                console.log(res.data);
                setInCart(true);
            });
        else
            setAuth(false);
    }
    return (
        <div class="prodPage">
            {
                !auth &&
                <div className="notAuth">
                    Для добавления в корзину необходимо авторизироваться
                    <div>
                        <button className="cancel" onClick={()=>setAuth(true)}>Отмена</button>
                        <a href="/authorization"><button>Войти</button></a>
                    </div>
                </div>
            }
            <MenuNav />
            <div className="breadcrumbs">
                <Breadcrumb>
                    <Breadcrumb.Item href='/'>Главная</Breadcrumb.Item>
                    <Breadcrumb.Item href='/'>Каталог</Breadcrumb.Item>
                    <Breadcrumb.Item href='/'>{animalBC}</Breadcrumb.Item>
                    <Breadcrumb.Item href={`/prods/${animal}/${type}/`}>{typeBC}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="generalInfo">
                {prod &&
                    <div className="photo">
                        <div className="circlePhoto" style={{ backgroundImage: `url(${require(`../pics/prods/${prod.image}`)})` }}></div>
                        <div className="mainPhoto">
                            <img src={require(`../pics/prods/${prod.image}`)} />
                        </div>
                    </div>
                }
                <div className="txts">
                    <div className="like">
                        <svg viewBox="0 0 471.7 418.2">
                            <path class="fill2" d="M414.4,59.4c-19.6-19.5-45.6-30.3-73.2-30.3c-27.6,0-53.7,10.8-73.3,30.4l-22.4,22.4c-5.3,5.3-13.8,5.3-19.1,0
        l-22.6-22.6c-19.6-19.6-45.7-30.4-73.4-30.4c-27.6,0-53.6,10.8-73.1,30.3C37.7,78.7,27,104.7,27,132.4s10.8,53.7,30.4,73.3
        L235.7,384l178.7-178c19.6-19.6,30.4-45.6,30.3-73.3C444.7,105,434,79,414.4,59.4z"></path>
                            <path class="fill" d="M433.6,40.3c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3L236,53.3l-13.1-13.1c-24.7-24.7-57.6-38.4-92.5-38.4
        C95.6,1.8,62.8,15.4,38.2,40C13.5,64.7-0.1,97.5,0,132.4c0,34.9,13.7,67.6,38.4,92.3l187.8,187.8c2.6,2.6,6.1,4,9.5,4
        s6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4C471.8,97.8,458.3,65,433.6,40.3z M414.4,206L235.7,384L57.4,205.7
        C37.8,186.1,27,160.1,27,132.4s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6
        c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4c19.6-19.6,45.7-30.4,73.3-30.4s53.6,10.8,73.2,30.3C434,79,444.7,105,444.7,132.7
        C444.8,160.4,434,186.4,414.4,206z"></path>
                        </svg>
                        <span>В избранное</span>
                    </div>
                    <div className="name">
                        <h5>
                            {prod && `${prod.brand} ${prod.name}`}
                        </h5>
                    </div>
                    <div className="price">
                        <p>Цена при онлайн заказе</p>
                        <p>{prod && prod.price} BYN</p>
                    </div>
                    {prod && prod.available ?
                        <div className="isAval">
                            <p>В наличии</p>
                        </div>
                        :
                        <div className="notAval">
                            <p>Нет в наличии</p>
                        </div>
                    }
                    {!inCart ?
                        <div className="tocart">
                            <button type="button" onClick={(e) => { addToCart(id, e); }}>В корзину</button>
                        </div>
                        :
                        <div className="tocart">
                            <div className="">В корзине</div>
                        </div>
                    }
                    <div className="conditions">
                        <a href="">Условия оплаты</a>
                        <div className="circle"></div>
                        <a href="">Условия доставки</a>
                    </div>
                </div>
            </div>
            {prod && <ProductMoreInfo prod={prod} type={type} />}
        </div>
    );
}
export default Product;