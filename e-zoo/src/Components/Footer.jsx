import React from "react";

import inst from '../pics/footer/instagram.png';
import fb from '../pics/footer/facebook.png';
import vk from '../pics/footer/vk.png';
import tg from '../pics/footer/telegram.png';

import inst1 from '../pics/footer/ig.svg';
import fb1 from '../pics/footer/fb.svg';
import vk1 from '../pics/footer/vk.svg';
import tg1 from '../pics/footer/tg.svg';

import mc_secure from '../pics/footer/mc_securecode.svg';
import mc from '../pics/footer/mastercard.svg';
import visa from '../pics/footer/visa.svg';
import visa_ver from '../pics/footer/visa_verified.svg';
import belcard from '../pics/footer/belcard.svg';
import assist from '../pics/footer/assist.svg';
import oplati from '../pics/footer/oplati.png';

function Footer() {
    return (
        <div className="footer">
            <div class="socialsMobile">
                <div class="socMobItem">
                    <a target="_blank" href="https://www.instagram.com/ezoo.by/" rel="noopener noreferrer nofollow">
                        <img src={inst1} alt=""/>
                    </a>
                </div>
                <div class="socMobItem">
                    <a target="_blank" href="https://www.facebook.com/www.ezoo.by" rel="noopener noreferrer nofollow">
                        <img src={fb1} alt=""/>
                    </a>
                </div>
                <div class="socMobItem">
                    <a target="_blank" href="https://vk.com/ezooby" rel="noopener noreferrer nofollow">
                        <img src={vk1} alt=""/>
                    </a>
                </div>
                <div class="socMobItem">
                    <a target="_blank" href="https://t.me/ezooby" rel="noopener noreferrer nofollow">
                        <img src={tg1} alt=""/>
                    </a>
                </div>
            </div>
            <div className="up">
                <div>
                    <div className="txts">
                        <div className="footItem">
                            <strong>О компании</strong>
                            <p>Магазины</p>
                            <p>Новости</p>
                            <p>О нас</p>
                            <p>Вакансии</p>
                        </div>
                        <div className="footItem">
                            <strong>Покупателям</strong>
                            <p>Бренды</p>
                            <p>Доставка</p>
                            <p>Оплата</p>
                            <p>Оферта</p>
                        </div>
                        <div className="line"></div>
                        <div className="footItem">
                            <strong>Ваш город</strong>
                            <p><u>Минск</u></p>
                            <p>Пожаловаться<br />руководителю</p>
                        </div>
                    </div>
                    <div className="left">
                        <div className="socials">
                            <img src={inst} alt="instagram" />
                            <img src={fb} alt="facebook" />
                            <img src={vk} alt="vk" />
                            <img src={tg} alt="telegram" />
                        </div>
                        <div className="line"></div>
                        <div className="inf">
                            <strong>7255</strong>
                            <p className="time">9:00-21:00</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="down">
                <div>
                    <div>
                        <p>Частное предприятие «ЗООХАУЗ» УНП 190942323 г. Минск, ул. Бирюзова, д.4/5, офис 2024 Дата регистрации в Торговом реестре РБ: 13.04.2018</p>
                    </div>
                    <div className="payments">
                        <img src={mc_secure} alt="mastercard. securecode" />
                        <img src={mc} alt="mastercard" />
                        <img src={visa} alt="visa" />
                        <img src={visa_ver} alt="virified by visa" />
                        <img src={belcard} alt="белкарт" />
                        <img src={assist} alt="assist" />
                        <img src={oplati} alt="оплати" />
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Footer;