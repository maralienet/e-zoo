import React, { useState, useEffect } from "react";
import { Col, Row } from 'react-bootstrap';
import Animals from "../Components/Animals";
import { useDispatch, useSelector } from 'react-redux';

import Carusel from "../Components/Carusel";
import ProductCard from "../Components/ProductCard";
import NewsCard from "../Components/NewsCard";
import BrandItem from "../Components/BrandItem";

import prod1 from '../pics/prods/1.jpg';
import prod2 from '../pics/prods/2.jpg';
import prod3 from '../pics/prods/3.jpg';

import dogSub from '../pics/main/dog.png';

import new1 from '../pics/main/news/1.jpg';
import new2 from '../pics/main/news/2.png';
import new3 from '../pics/main/news/3.jpg';

import rc from '../pics/main/brands/rc.jpg';
import brit from '../pics/main/brands/brit.png';
import hd from '../pics/main/brands/happydog.jpg';
import propl from '../pics/main/brands/proplan.png';
import hc from '../pics/main/brands/happycat.png';
import unica from '../pics/main/brands/unica.png';
import bc from '../pics/main/brands/bc.png';
import eukanuba from '../pics/main/brands/eukanuba.jpg';
import farmina from '../pics/main/brands/farmina.png';
import benek from '../pics/main/brands/benek.jpg';

function Main() {
    const dispatch = useDispatch();
    const active = useSelector(state => state.activeSearch);

    const showSearch = (event) => {
        event.preventDefault();
        dispatch({ type: 'SHOW_HIDE_SEARCH', activeSearch: !active });
        if (!active)
            document.body.style.overflow = 'hidden';
        else
            document.body.style.overflow = 'unset';
    }
    return (
        <div className="main">
            <Row className="firstRow">
                <Col xl={6} lg={6} sm={12}>
                    <p style={{ fontSize: '1.8em' }} className="desktop">Выберите товары<br /></p>
                    <h2 className="desktop">для вашего питомца</h2>
                    <h2 className="mobile">Товары для питомцев</h2>
                </Col>
                <Col xl={6} lg={6} sm={12} className="searching">
                    <form className="srch">
                        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle r="7" transform="matrix(-1 0 0 1 8 8.64941)" stroke="#3E3E3E" stroke-width="2"></circle>
                            <path d="M12 14.6494L15 18.6494" stroke="#3E3E3E" stroke-width="2"></path>
                        </svg>
                        <input type="search" onMouseDown={showSearch} placeholder="Умный поиск товара" />
                    </form>
                </Col>
            </Row>
            <Animals />

            <div className="salesBanner">
                <Carusel />
            </div>
            <div className="saleCont">
                <div className="f">
                    <h4>
                        Акции
                        <a className="salesInfo" href="/salesInfo">?</a>
                    </h4>
                    <span className="salesCount">
                        552
                    </span>
                    <h4><a className="showSales" href="/sales">Смотреть все</a></h4>
                </div>
                <div className="prods">
                    <ProductCard img={prod1} name="Royal Canin Club CC корм для собак старше 12 месяцев с нормальной активностью" packing='20' priceOld='199.60' price='189.80' />
                    <ProductCard img={prod2} name="Royal Canin Club CC корм для собак старше 12 месяцев с нормальной активностью" packing='20' priceOld='199.60' price='189.80' />
                    <ProductCard img={prod3} name="Royal Canin Club CC корм для собак старше 12 месяцев с нормальной активностью" packing='20' priceOld='199.60' price='189.80' />
                </div>
            </div>
            <div className="getNews">
                <h4>Узнавайте о новостях и<br />скидках первыми</h4>
                <form className="subscribe">
                    <input type="text" placeholder="Ваш e-mail" />
                    <button type="submit">Подписаться</button>
                </form>
                <div class="privacyCheck">
                    <input type="checkbox" id="agreed" name="agreement_1" />
                    <label for="agreed">
                        <span>Ознакомлен с <a target="_blank" href="">Политикой в области персональных данных</a>. Согласен на обработку персональных данных</span>
                    </label>
                </div>
                <img class="dogSub" src={dogSub} />
            </div>
            <div className="newsCont">
                <div className="f">
                    <h4>Новости</h4>
                    <h4><a className="showNews" href="/news">Смотреть все</a></h4>
                </div>
                <div className="news">
                    <NewsCard img={new1} text='Ночные скидки. Возвращение!' date='05.02.2024' />
                    <NewsCard img={new2} text='Такого еще не было!' date='02.02.2024' />
                    <NewsCard img={new3} text='Далматинец Джонни!' date='02.02.2024' />
                </div>
            </div>
            <div className="brandCont">
                <div className="f">
                    <h4>Бренды</h4>
                    <h4><a className="showBrands" href="/brands">Смотреть все</a></h4>
                </div>
                <div className="brands">
                    <BrandItem href='/brands/rc' img={rc} />
                    <BrandItem href='/brands/brit' img={brit} />
                    <BrandItem href='/brands/hd' img={hd} />
                    <BrandItem href='/brands/propl' img={propl} />
                    <BrandItem href='/brands/hc' img={hc} />
                    <BrandItem href='/brands/unica' img={unica} />
                    <BrandItem href='/brands/bc' img={bc} />
                    <BrandItem href='/brands/eukanuba' img={eukanuba} />
                    <BrandItem href='/brands/farmina' img={farmina} />
                    <BrandItem href='/brands/benek' img={benek} />
                </div>
            </div>
        </div>
    )
}

export default Main;