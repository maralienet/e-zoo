import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

function SearchWin() {
    const dispatch = useDispatch();
    const active = useSelector(state => state.activeSearch);

    const showSearch = () => {
        dispatch({ type: 'SHOW_HIDE_SEARCH', activeSearch: !active });
        if (!active)
            document.body.style.overflow = 'hidden';
        else
            document.body.style.overflow = 'unset';
    }
    const [type, setType] = useState('Везде');
    const [typeSel, setTypeSel] = useState(false);
    let _type = type;
    let _typeSel = typeSel;

    return (
        <div className="searchWin">
            <div className="searching">
                <div className="manages">
                    <div className="type" onClick={() => { setTypeSel(!_typeSel) }}>
                        <span>{_type}</span>
                        <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
                            <path d="M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z"></path>
                        </svg>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Что вы хотите найти?" />
                    </div>
                    <div className="searchBtn">
                        <button>
                            <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3074 8.03846C14.3074 11.3734 11.6039 14.0769 8.26893 14.0769C4.93398 14.0769 2.23047 11.3734 2.23047 8.03846C2.23047 4.70351 4.93398 2 8.26893 2C11.6039 2 14.3074 4.70351 14.3074 8.03846ZM12.331 14.9766C11.139 15.6759 9.75081 16.0769 8.26893 16.0769C3.82941 16.0769 0.230469 12.478 0.230469 8.03846C0.230469 3.59894 3.82941 0 8.26893 0C12.7085 0 16.3074 3.59894 16.3074 8.03846C16.3074 10.2703 15.3978 12.2897 13.9291 13.7463L18.4758 18.2929C18.8663 18.6834 18.8663 19.3166 18.4758 19.7071C18.0853 20.0977 17.4521 20.0977 17.0616 19.7071L12.331 14.9766Z" fill="white"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="closeBtn">
                        <button onClick={showSearch}>
                            <svg height="512px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="512px" xmlns="http://www.w3.org/2000/svg">
                                <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className={`content ${_typeSel ? 'active' : ''}`}>
                    <div className="types">
                        <ul>
                            <li onMouseOver={() => { setType('Везде') }} className={_type === 'Везде' ? 'active' : ''}>Везде</li>
                            <li onMouseOver={() => { setType('Ветаптека') }} className={_type === 'Ветаптека' ? 'active' : ''}>Ветаптека</li>
                            <li onMouseOver={() => { setType('Грызуны') }} className={_type === 'Грызуны' ? 'active' : ''}>Грызуны</li>
                            <li onMouseOver={() => { setType('Кошки') }} className={_type === 'Кошки' ? 'active' : ''}>Кошки</li>
                            <li onMouseOver={() => { setType('Птицы') }} className={_type === 'Птицы' ? 'active' : ''}>Птицы</li>
                            <li onMouseOver={() => { setType('Рыбки') }} className={_type === 'Рыбки' ? 'active' : ''}>Рыбки</li>
                            <li onMouseOver={() => { setType('Собаки') }} className={_type === 'Собаки' ? 'active' : ''}>Собаки</li>
                        </ul>
                    </div>
                    <div className="more">
                        {
                            (() => {
                                switch (_type) {
                                    case 'Ветаптека':
                                        return <div>
                                            <ul>
                                                <li><a href="">Ветпрепараты</a></li>
                                                <li><a href="">Дезинфектанты</a></li>
                                                <li><a href="">Дерматология</a></li>
                                                <li><a href="">Для глаз</a></li>
                                                <li><a href="">Для иммунной системы</a></li>
                                                <li><a href="">Для почек и мочевой системы</a></li>
                                                <li><a href="">Для суставов</a></li>
                                                <li><a href="">Для ушей</a></li>
                                                <li><a href="">Защита от блох и клещей</a></li>
                                                <li><a href="">Контрацептивы</a></li>
                                                <li><a href="">От стресса</a></li>
                                                <li><a href="">Средства от гельминтов</a></li>
                                            </ul>
                                        </div>;
                                    case 'Грызуны':
                                        return <div>
                                            <ul>
                                                <li><a href="">Содержание и уход</a></li>
                                                <li><a href="">Аксессуары</a></li>
                                                <li><a href="">Клетки</a></li>
                                                <li><a href="">Наполнители и сено</a></li>
                                                <li><a href="">Посуда</a></li>
                                                <li><a href="">Туалеты и купалки</a></li>
                                            </ul>
                                            <ul>
                                                <li><a href="">Корм</a></li>
                                                <li><a href="">Лакомства и витамины</a></li>
                                                <li><a href="">Сухой корм</a></li>
                                            </ul>
                                        </div>;
                                    case 'Кошки':
                                        return <div>
                                            <ul>
                                                <li><a href="">Содержание и уход</a></li>
                                                <li><a href="">Амуниция</a></li>
                                                <li><a href="">Гигиена и косметика</a></li>
                                                <li><a href="">Груминг</a></li>
                                                <li><a href="">Домики и лежаки</a></li>
                                                <li><a href="">Игрушки</a></li>
                                                <li><a href="">Когтеточки</a></li>
                                                <li><a href="">Посуда и миски</a></li>
                                                <li><a href="">Прочее для дома</a></li>
                                                <li><a href="">Туалеты и совки</a></li>
                                            </ul>
                                            <ul>
                                                <li><a href="">Корм</a></li>
                                                <li><a href="">Витамины и добавки</a></li>
                                                <li><a href="">Консервы</a></li>
                                                <li><a href="">Лакомства</a></li>
                                                <li><a href="">Пресервы</a></li>
                                                <li><a href="">Сухой корм</a></li>
                                            </ul>
                                            <ul>
                                                <li><a href="">Наполнители</a></li>
                                                <li><a href="">Впитывающий</a></li>
                                                <li><a href="">Древесный</a></li>
                                                <li><a href="">Комкующийся</a></li>
                                                <li><a href="">Силикагелевый</a></li>
                                                <li><a href="">Соевые</a></li>
                                            </ul>
                                            <ul>
                                                <li><a href="">Диетический корм</a></li>
                                                <li><a href="">Диетический корм</a></li>
                                                <li><a href="">Консервы диетические</a></li>
                                                <li><a href="">Пресервы диетические</a></li>
                                            </ul>
                                        </div>;
                                    case 'Птицы':
                                        return <div>
                                            <ul>
                                                <li><a href="">Содержание и уход</a></li>
                                                <li><a href="">Аксессуары</a></li>
                                                <li><a href="">Клетки</a></li>
                                                <li><a href="">Купалки</a></li>
                                                <li><a href="">Наполнители и подстилки</a></li>
                                                <li><a href="">Посуда</a></li>
                                            </ul>
                                            <ul>
                                                <li><a href="">Корм</a></li>
                                                <li><a href="">Лакомства и витамины</a></li>
                                                <li><a href="">Сухой корм</a></li>
                                            </ul>
                                        </div>;
                                    case 'Рыбки':
                                        return <div>
                                            <ul>
                                                <li><a href="">Содержание и уход</a></li>
                                                <li><a href="">Химия и лекарства</a></li>
                                            </ul>
                                            <ul>
                                                <li><a href="">Аквариумы</a></li>
                                                <li><a href="">Аквариумы и тумбы</a></li>
                                            </ul>
                                            <ul>
                                                <li><a href="">Корм</a></li>
                                                <li><a href="">Корм для рыб</a></li>
                                                <li><a href="">Корм для черепах</a></li>
                                            </ul>
                                        </div>;
                                    case 'Собаки':
                                        return <div>
                                            <ul>
                                                <li><a href="">Содержание и уход</a></li>
                                                <li><a href="">Амуниция</a></li>
                                                <li><a href="">Гигиена и косметика</a></li>
                                                <li><a href="">Груминг</a></li>
                                                <li><a href="">Домики и лежаки</a></li>
                                                <li><a href="">Игрушки</a></li>
                                                <li><a href="">Одежда и обувь</a></li>
                                                <li><a href="">Посуда</a></li>
                                                <li><a href="">Транспортировка, переноски, будки</a></li>
                                                <li><a href="">Туалеты, пеленки и подгузники</a></li>
                                            </ul>
                                            <ul>
                                                <li><a href="">Корм</a></li>
                                                <li><a href="">Витамины и добавки</a></li>
                                                <li><a href="">Консервы</a></li>
                                                <li><a href="">Лакомства</a></li>
                                                <li><a href="">Пресервы</a></li>
                                                <li><a href="">Сухой корм</a></li>
                                            </ul>
                                            <ul>
                                                <li><a href="">Диетический корм</a></li>
                                                <li><a href="">Диетический сухой корм</a></li>
                                                <li><a href="">Консервы диетические</a></li>
                                            </ul>
                                        </div>;
                                    default:
                                        return null;
                                }
                            })()
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchWin;