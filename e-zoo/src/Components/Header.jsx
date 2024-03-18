import React, { useState, useEffect } from "react";
import useCookie from './useCookie'
import axios from "axios";
import logo from "../pics/logo.png";
import sales from "../pics/header/sales.svg";
import { useDispatch, useSelector } from 'react-redux';

function Header() {
    const dispatch = useDispatch();
    const active = useSelector(state => state.activeMobMenu);
    const activeSearch = useSelector(state => state.activeSearch);
    const activeCall = useSelector(state => state.activeCall);

    const uidCookie = useCookie('userid');

    const [cartCount, setCartCount] = useState(false);

    useEffect(() => {
            getCartCount();
    }, [uidCookie]);

    const getCartCount = async () => {
        const res = await axios.get(`http://localhost:3001/cart/count?userid=${uidCookie}`);
        setCartCount(res.data[0]);
    }

    const showMobMenu = () => {
        dispatch({ type: 'SHOW_HIDE_MENU', activeMobMenu: !active });
    }

    const showSearch = () => {
        dispatch({ type: 'SHOW_HIDE_SEARCH', activeSearch: !activeSearch });
        if (!activeSearch)
            document.body.style.overflow = 'hidden';
        else
            document.body.style.overflow = 'unset';
    }

    const showCall = () => {
        dispatch({ type: 'SHOW_HIDE_CALL', activeCall: !activeCall });
        if (!active)
            document.body.style.overflow = 'hidden';
        else
            document.body.style.overflow = 'unset';
    }

    return (
        <div className="header">
            <div className="mobileInf">
                <button className="burger" type="button" onClick={showMobMenu}>
                    <span></span>
                </button>
                <div className="mobileInf">
                    <div onClick={showSearch}>
                        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle r="7" transform="matrix(-1 0 0 1 8 8.64941)" stroke="#3E3E3E" stroke-width="2"></circle>
                            <path d="M12 14.6494L15 18.6494" stroke="#3E3E3E" stroke-width="2"></path>
                        </svg>
                    </div>
                    <a className="navItem" href="/sales">
                        <img src={sales} alt='sales' />
                    </a>
                </div>
            </div>
            <div>
                <a href="/#/"><img className="logo" src={logo} alt="logo" /></a>
            </div>
            <div className="inf">
                <div className="phone" onClick={showCall}>
                    <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.43984 2.04248L5.43332 2.02176L5.4259 2.00134C5.34492 1.77847 5.21212 1.54793 4.99868 1.35937C4.78017 1.16633 4.52736 1.06185 4.27985 1.02109C3.85691 0.951451 3.45647 1.06867 3.17877 1.17519C2.43228 1.40424 1.77435 1.99901 1.35557 2.84531L1.35069 2.85516L1.34603 2.86512C0.808997 4.0132 0.958893 5.33342 1.37407 6.50904C1.7963 7.70459 2.54147 8.89894 3.42473 9.9189C4.30699 10.9377 5.37191 11.8343 6.47487 12.3931C7.55767 12.9418 8.83594 13.2392 10.0154 12.7609L10.0262 12.7565L10.0369 12.7518C10.9659 12.3495 11.5248 11.6292 11.7878 10.9797L11.7961 10.9592L11.8035 10.9383C11.8884 10.6985 12.0226 10.3052 11.9966 9.90159C11.9816 9.66961 11.9141 9.41068 11.7477 9.16865C11.5878 8.93615 11.3778 8.7791 11.1683 8.67393L11.1678 8.67367C10.5811 8.36317 9.96436 8.03673 9.31277 7.7409C8.91066 7.55441 8.4997 7.5728 8.16861 7.7026C7.8818 7.81504 7.59387 8.03683 7.43392 8.36066C7.36158 8.5018 7.30699 8.57595 7.27025 8.61951C7.26443 8.62641 7.25865 8.63306 7.25274 8.63962C7.17805 8.57943 7.0899 8.50289 6.98999 8.41015C6.72029 8.15979 6.40497 7.82881 6.09871 7.47481C5.79229 7.12063 5.50979 6.76058 5.30084 6.45548C5.19607 6.3025 5.11792 6.17511 5.0659 6.07737C5.06348 6.07281 5.06116 6.06841 5.05894 6.06416C5.08616 6.03738 5.10966 6.01643 5.13718 5.99483C5.18569 5.95673 5.2652 5.90287 5.40556 5.83919L5.4333 5.82661L5.46022 5.81236C5.99722 5.52815 6.3592 4.81685 6.12736 4.06814C6.01551 3.69661 5.88929 3.33819 5.77078 3.00497C5.76074 2.97676 5.75078 2.94876 5.74088 2.92095C5.63084 2.61182 5.52928 2.32651 5.43984 2.04248Z" stroke="#3E3E3E" stroke-width="2"></path>
                    </svg>
                    <strong>7255</strong>
                </div>
                <div className="time">
                    9:00-21:00
                </div>
            </div>
            <div className="txts">
                <div className="nav">
                    <a className="navItem sales" href="/sales">
                        <img src={sales} alt='sales' />
                        <span>Акции</span>
                    </a>
                    <a className="navItem" href="/authorization">
                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="6.5" r="5.5" stroke="#3E3E3E" stroke-width="2"></circle><path d="M1 16.2255C2.78958 13.6706 5.75551 12 9.11162 12C12.3318 12 15.1927 13.5379 17 15.9194" stroke="#3E3E3E" stroke-width="2"></path></svg>
                        <span>Личный кабинет</span>
                    </a>
                    <a className="navItem" href="/cart">
                        <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.60107 6.81592H16.2024V16.0715C16.2024 17.7284 14.8592 19.0715 13.2024 19.0715H4.60108C2.94422 19.0715 1.60107 17.7284 1.60107 16.0715V6.81592Z" stroke="#3E3E3E" stroke-width="2"></path>
                            <path d="M12.9019 6.81592L12.9019 5.81592C12.9019 3.60678 11.111 1.81592 8.90186 1.81592V1.81592C6.69272 1.81592 4.90186 3.60678 4.90186 5.81592L4.90186 6.81592" stroke="#3E3E3E" stroke-width="2"></path>
                        </svg>
                        <span class="val">{cartCount ? cartCount.count : 0}</span>
                        <span>Корзина</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Header;