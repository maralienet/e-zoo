import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import useCookie from '../Components/useCookie'
import pricemark from '../pics/pricemark.png';
import pricemarkWhite from '../pics/pricemarkWhite.png';

function ProductCard({ id, img, name, href, packing, priceOld, price, onSale = true, measurement = 'кг' }) {
    let navigate = useNavigate();
    const [inCart, setInCart] = useState(false);
    const [auth, setAuth] = useState(true);
    const uidCookie = useCookie('userid');

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

    useEffect(() => {
        axios.get(`http://localhost:3001/cart?userid=${uidCookie}&prodid=${id}`).then((res) => {
            setInCart(res.data.length > 0);
        });
    }, []);

    return (
        <>
            {
                !auth &&
                <div className="notAuth">
                    Для добавления в корзину необходимо авторизироваться
                    <div>
                        <button className="cancel" onClick={() => setAuth(true)}>Отмена</button>
                        <a href="/authorization"><button>Войти</button></a>
                    </div>
                </div>
            }
            <a onClick={() => navigate(`/prods/${href}/${id}`)} className="prodCard">
                {onSale ?
                    <div className="zooprice">
                        <img src={pricemark} />
                    </div>
                    : <div className="zooprice">
                        <img src={pricemarkWhite} />
                    </div>}
                <div className="insideCard">
                    <div className="photo">
                        <img src={img} alt={name} />
                    </div>
                    <div className="inf">
                        <p className="name"><strong>{name}</strong></p>
                        {measurement && <p className="packing">Фасовка: {packing} {measurement}</p>}
                        {onSale ?
                            <div className="prices">
                                <span className="new">{price} BYN</span>
                                <span className="old">{priceOld} BYN</span>
                            </div>
                            :
                            <div className="prices">
                                <span className="new">{price} BYN</span>
                            </div>}
                    </div>
                </div>
                {!inCart ?
                    <div className="tocart">
                        <button type="button" onClick={(e) => { addToCart(id, e); }}>В корзину</button>
                    </div>
                    :
                    <div className="tocart">
                        <div className="">В корзине</div>
                    </div>
                }
            </a>
        </>
    );
}

export default ProductCard;